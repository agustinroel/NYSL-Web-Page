    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCjXzpHeb0tOoUBvbanvpLT2lP4MPLIOtY",
        authDomain: "modulo-3---task-2.firebaseapp.com",
        databaseURL: "https://modulo-3---task-2.firebaseio.com",
        projectId: "modulo-3---task-2",
        storageBucket: "modulo-3---task-2.appspot.com",
        messagingSenderId: "129370465307",
        appId: "1:129370465307:web:bc784ef7a5f507c19244be",
        measurementId: "G-863HMM2VXH"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth();
    firebase.database();

    //SINGLE PAGE APP Y ANIMACIONES DE TRANSICION

    $("#index").click(function () {
        $(".home").fadeIn();
        $(".game-info").fadeOut();
        $(".rules").fadeOut();
        $(".match-forum").fadeOut();
    })

    $("#game-info").click(function () {
        $(".home").fadeOut();
        $(".game-info").css("display", "block").fadeIn();
        $(".rules").fadeOut();
        $(".match-forum").fadeOut();
    })

    $("#rules").click(function () {
        $(".home").fadeOut();
        $(".game-info").fadeOut();
        $(".match-forum").fadeOut();
        $(".rules").css("display", "block").fadeIn();
    })


    //PARA LOGIN
    function loginGoogle() {
        let proveedor = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(proveedor)
    }

    //INSTANCIA DE VUE

    var app = new Vue({
                el: "#app",
                data: {
                    currentUser: null,
                    username: " ",
                    userphoto: " ",
                    message: " ",
                    posts: [],
                    match: " ",
                    id: 0
                },
                methods: {
                    submit: function () {
                        let message = {
                            text: app.message
                        };
                        firebase.database().ref("/match-forum-posts/" + app.id).push(message) //cada vez que se escribe, el mensaje se guarda en el numero de id correspondiente
                        app.message = " ";

                    },
                    partidos: function (id) {
                        console.log(id);
                        $(".home").fadeOut();
                        $(".game-info").fadeOut();
                        $(".rules").fadeOut();
                        $(".match-forum").css("display", "block").fadeIn();
                        app.id = id
                        app.match = $("#partido" + id).text();
                        app.posts = []
                        firebase.database().ref("/match-forum-posts/" + id).on('child_added', function (childSnapshot, prevChildkey) {
                            console.log(childSnapshot.val());
                            app.posts.push(childSnapshot.val())
                        })
                    },
                    signOut: function () {
                        firebase.auth().signOut();
                         app.posts = [];
                            }
                    }
                })

            //CUANDO EL ESTADO DE LA AUTENTICACION CAMBIE...

            firebase.auth().onAuthStateChanged(function (user) {
                if (user != null) {
                    $(".google").css("display", "none");
                    $(".dropdown").css("display", "inline-block");
                    $(".matches-table a").css("pointer-events", "all")
                    $(".matches-table a").css("color", "blue")
                    app.username = firebase.auth().currentUser.displayName
                    app.userphoto = firebase.auth().currentUser.photoURL
                    app.currentUser = firebase.auth().currentUser
                } else {
                    app.currentUser = null
                    $(".dropdown").css("display", "none");
                    $(".matches-table a").css("pointer-events", "none")
                    $(".matches-table a").css("color", "white")
                    $(".google").css("display", "inline-block");
                }

            })

            //PARA GUARDAR DATOS EN LA BASE DE DATOS

            //firebase.database().ref("/posicionEnLaBaseDeDatos").push(variableAGuardar)