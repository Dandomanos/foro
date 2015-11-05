'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:PostviewCtrl
 * @description
 * # PostviewCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('PostviewCtrl', ['$scope', '$routeParams', 'Post', 'Auth', '$anchorScroll', '$location', '$timeout', function ($scope, $routeParams, Post, Auth, $anchorScroll, $location, $timeout) {




    Auth.checkUser();


    $scope.profile = Auth.getProfile(Auth.user.uid);
    $scope.profile.$loaded(function(){
      Auth.updateConnection(Auth.user.uid);
    });


    //Añadir watch para cambios en los post {{$scope.post}}
    //Revisar de nuevo la conexión de cada user



    var callbackData = function()
    {
        console.log("callBack", $scope.post.author);
        // $scope.post.author.profile = Auth.getProfile($scope.post.author.uid);
        // $scope.post.author.profile.$loaded(function(){
        //   console.log("perfil del autor cargado");
        // })
    };



    $scope.post = Post.get($routeParams.postId, $routeParams.section, callbackData);

    //Paginado
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPosts = 0;
    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.postComments.length/$scope.pageSize);
    };

    $scope.postComments = Post.getComments($routeParams.postId, $routeParams.section, callbackData);
    $scope.exist = true;
    $scope.lastAuthor = {};
    $scope.post.$loaded().then(function(data){
        // console.log("DATA",data);
        if(data.author===undefined)
        {
            console.log("El post al que intentas acceder ha sido borrado o no existe");
            $scope.exist = false;
        } else
        {
            $scope.exist = true;
             // console.log("acabo de cargar", data);
             // console.log("author", data.author);
            $scope.autor = Auth.getProfile(data.author.uid);
            $scope.lastAuthor.uid = data.author.uid;
            console.log("UID",  $scope.lastAuthor.uid);

             // console.log("ultimo post", $scope.post.comments[0]);

             $scope.cargarRangos();
         }

            });
    $scope.post.$watch(function(){
      console.log("Se ha producido un nuevo post: ");
      if(Auth.profile.username===undefined)
      {
        console.log("Usuario eliminado, no debería estar aquí");
        Auth.checkUser();
      } else {
        console.log("USERNAME", Auth.profile.username);
        $scope.cargarRangos();
      }
    });


    $scope.replying = false;
    $scope.editing = false;
    $scope.original = false;

    $scope.editByAdmin = false;

    $scope.edited = {};
    $scope.editedRef = {};
    
    $scope.edit = {comment: "Aqui va la edición de comentario"};

    $scope.postToEdit = {};

    $scope.comment = {};
    $scope.comment.comment = '';

    $scope.warningExpanded = false;

    $scope.isConnected = function(milisecs) {
                // console.log("milisecs", milisecs);
                var actualDate = new Date().getTime();
                var diferencia = actualDate - milisecs;
                // console.log("Diferencia", diferencia);
                if(diferencia<=300000)
                {
                    return true;
                } else
                {
                    return false;
                }
            };

    $scope.cargarRangos = function()
    {
      // $scope.numberOfPosts = 0;

        // for(var comment in $scope.post.comments)
        //      {
        //          $scope.post.comments[comment].author.profile =  Auth.getProfile($scope.post.comments[comment].author.uid);
        //          $scope.post.comments[comment].author.profile.$loaded(function(){

        //             $scope.post.comments[comment].author.connected = $scope.isConnected($scope.post.comments[comment].author.profile.lastConnection);

        //             $scope.lastAuthor.uid = $scope.post.comments[comment].author.uid;

        //          });
        //          $scope.numberOfPosts++;
                 
                
        //      }

             for(var i=0; i<$scope.postComments.length; i++)
             {
                // console.log("Comment Array", $scope.postComments[i]);
                $scope.postComments[i].author.profile = Auth.getProfile($scope.postComments[i].author.uid);
                
             }
             if($scope.postComments[$scope.postComments.length-1]!==undefined)
             {
                $scope.lastAuthor.uid = $scope.postComments[$scope.postComments.length-1].author.uid;
             }
    };

    $scope.reiniciarCampos = function()
    {

      Auth.updateConnection(Auth.user.uid);
      $scope.comment.comment = '';
      $scope.edit.comment = '';
      $scope.originalComment = '';

      $scope.replying = false;
      $scope.editing = false;
      $scope.original = false;
      $scope.editByAdmin = false;

      $scope.$apply();
    };

    $scope.reiniciarVariables = function()
    {
         
          if($scope.post.comments)
          {
            console.log("Existen comentarios, cargo los rangos");
            $scope.cargarRangos();
            console.log("Rangos cargados");
          }
          console.log("Reinicio Variables");
          // $scope.replying = false;
          // $scope.editing = false;
          // $scope.original = false;

          $scope.reiniciarCampos();
    };

     $scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

    $scope.youAreTheLast = function()
    {
      if($scope.lastAuthor.uid!==Auth.user.uid)
        { return false;
        } else
        { 
          return true;
        }
    };

    $scope.responder = function() {
      if($scope.lastAuthor.uid!==Auth.user.uid)
        {
          console.log("Puedes Responder");
        $scope.replying = true;
        $scope.editing = false;
        $scope.original = false;
        $scope.editByAdmin = false;
        $timeout(function() {

          console.log("me muevo al div");
          $scope.scrollTo('newPost');
          

          console.log("$scope.editing", $scope.editing);
        }, 1);

      } else
      {
        console.log("Eres el autor del último post");
      }
        
    };

      $scope.editLikeUser = function(post)
      {
        $scope.editByAdmin = false;
        $scope.editar(post);
      }


      $scope.editar = function(post)
      {

        
          console.log("Puedes Comentar");
          $scope.editing = true;
          $scope.replying = false;
          $scope.original = false;
          // $scope.editByAdmin = false;
          $scope.postToEdit = post;
          $scope.edit.comment = $scope.postToEdit.comment;
          console.log("Abro el div");

          $timeout(function() {

            console.log("me muevo al div");
            $scope.scrollTo('editPost');
            

            console.log("$scope.editing", $scope.editing);
            }, 1);


        
        
      };

      $scope.editarByAdmin = function(post)
      {
        $scope.editByAdmin = true;
         $scope.editar(post);
      };

      $scope.editarOriginal = function()
      {
        $scope.editing = false;
        $scope.replying = false;
        $scope.original = true;
        $scope.editByAdmin = false;

        $scope.postToEdit = $scope.post;
        $scope.originalComment = $scope.post.comment;

        

        $timeout(function() {

          console.log("me muevo al div");
          $scope.scrollTo('editOriginal');
          

          console.log("$scope.editing", $scope.editing);
        }, 1);
      };


    $scope.fechar = function(milisecs)
     {
        var fecha = new Date(milisecs);
        return fecha;
     };

     var callbackComment = function()
     {
      // if(scope.editByAdmin === true)
              $scope.reiniciarVariables();
     };

     var callbackAfterAdmin = function()
     {
            Post.updateAfterEdit($scope.post.$id, $routeParams.section, $scope.edited.newMessage, callbackComment);
            console.log("Actualizado a LastUpdate");
     };

     var callbackLog = function()
     {
        Post.commentByAdmin($scope.editedRef, $routeParams.section, $scope.editByAdmin, callbackAfterAdmin);
     };

     var callbackLogOriginal = function()
     {
        Post.originalByAdmin($scope.post.$id, $routeParams.section, $scope.editByAdmin, callbackAfterAdmin);
     };



     var callbackCount = function()
     {
        console.log("Suma de comentario realizada correctamente");
        Post.addEditLog($scope.editedRef, $scope.edited, $routeParams.section).then(function(ref)
          {
            console.log("comentario editado correctamente");
            console.log("ref", ref);
            //Actualizar fecha de edición primero
            Post.setDateEdit($scope.editedRef, $scope.edited, $routeParams.section, callbackLog);
          });
     };

     var callbackCountOriginal = function()
     {
        console.log("Suma de post original realizada correctamente");
        // addEditOriginalLog:function(postID, edited, Section)
        Post.addEditOriginalLog($scope.post.$id, $scope.edited, $routeParams.section).then(function(ref)
          {
            console.log("comentario editado correctamente");
            console.log("ref", ref);
            // setDateEditOriginal:function(postID, edited, Section, callback)
            Post.setDateEditOriginal($scope.post.$id, $scope.edited, $routeParams.section, callbackLogOriginal);

          });
     };

     var callbackEdit = function()
     {
      var count;
      if($scope.postToEdit.edited!==undefined)
      {

        count = $scope.postToEdit.edited.count + 1;
      } else
      {
        count = 1;
      }
          console.log("Comentario modificado");
          console.log("Editado " + count + " veces");
          Post.updateCountComment($scope.editedRef, count, $routeParams.section, callbackCount);
     };

     var callbackOriginalEdit = function()
     {
        var count;
        if($scope.post.edited!==undefined && $scope.post.edited.count!==undefined)
        {
          count = $scope.post.edited.count + 1;
        } else
        {
          count = 1;
        }
        console.log("Original editado " + count + " veces");
        // updateCountOriginal:function(postID, count, Section, callback)
        Post.updateCountOriginal($scope.post.$id, count, $routeParams.section, callbackCountOriginal);

     };

     $scope.submitPost = function () {
        $scope.comment.author = {username: $scope.profile.username, uid: $scope.profile.$id};
        $scope.comment.date = new Date().getTime();
        $scope.comment.edited = {count:0};
        console.log("FECHA", $scope.post.date);
        Post.addComment($scope.post, $scope.comment).then(function(ref) {
            $scope.comment.id = ref.key();
            Auth.addCommentToProfile($scope.profile.$id, ref.key(), $scope.post,  $scope.comment, $routeParams.postId);
            console.log("Comentario actualizado", ref);

            console.log("Comment ID", $scope.comment.id);
            Post.addIdToComment($scope.post, $scope.comment, callbackComment);
        });
     };

    $scope.EditOriginalPost = function(){
      
      //Preparamos la edición de comentario
        $scope.edited = {
          prevMessage :
          {
            author:
            {
              username: $scope.post.author.username,
              uid: $scope.post.author.uid
            },
            date : $scope.post.date,
            comment : $scope.post.comment
          },
          newMessage :
          {
            author:
            {
              username: $scope.profile.username,
              uid: $scope.profile.$id
            },
            date : new Date().getTime(),
            comment : $scope.originalComment
          }
        };

        console.log("EDITED", $scope.edited);

        //Preparamos el objeto con el id de post y comentario
        // $scope.editedRef = {postID : post.$id, commentID : $scope.postToEdit.id };

        /*Mandamos la petición al servicio Post*/
        // editOriginal:function(postID, Section, newMessage, callback)
        Post.editOriginal($scope.post.$id, $scope.post.section, $scope.originalComment, callbackOriginalEdit);
    };

     $scope.EditPost = function (post) {

        //Preparamos la edición de comentario
        $scope.edited = {
          prevMessage :
          {
            author:
            {
              username: $scope.postToEdit.author.username,
              uid: $scope.postToEdit.author.uid
            },
            date : $scope.postToEdit.date,
            comment : $scope.postToEdit.comment
          },
          newMessage :
          {
            author:
            {
              username: $scope.profile.username,
              uid: $scope.profile.$id
            },
            date : new Date().getTime(),
            comment : $scope.edit.comment
          }
        };

        //Preparamos el objeto con el id de post y comentario
        $scope.editedRef = {postID : post.$id, commentID : $scope.postToEdit.id };

        /*Mandamos la petición al servicio Post*/
        Post.editComment($scope.editedRef, post.section, $scope.edit.comment, callbackEdit);
     };

     $scope.isAuthor = function(id) {
          // console.log("Auth.user.uid", Auth.user.uid);
          // console.log("IDPost", id);
          if(Auth.user)
          {
            if(Auth.user.uid===id)
            {
              return true;
            } else
            {
              return false;
            }
          } else
          {
            return false;
          }

        };

        $scope.isAdmin = function(){
      
       if($scope.profile)
       {
          if($scope.profile.rango==='admin')
          {
            return true;
          } else
          {
            return false;
          }
      }
    };
     
  }]);
