define([
    'jquery'
], function($) {
    var tip = "";
    $('button').on('click', function() {
        var storage = window.localStorage;
        var userName = $.trim($('.text').val()),
            pwd = $.trim($('.pwd').val());
        if (userName == '' || pwd == '') {
            tip = '用户名或密码不能为空';
        } else {
            var phonereg = /^1[34578]\d{9}$/;
            var emialreg = /^\w+@\w+\.[com|cn|net]$/;
            if (!(phonereg.test(userName) || emialreg.test(userName))) {
                tip = '用户名格式错误';
            }
            var pwdreg = /[^a-z0-9]/i;
            if (pwdreg.test(pwd) || pwd.length < 5 || pwd.length > 10) {
                tip = '密码格式错误';
            } else {
                var numreg = /^\d{5,10}$/;
                var codereg = /^[a-z]{5,10}$/i;
                if (numreg.test(pwd) || codereg.test(pwd)) {
                    tip = '密码格式错误';
                }
            }
        }
        if (tip) {
            $('.tip').html(tip)
        } else {
            if ($(this).hasClass('loginbtn')) {
                $.ajax({
                    url: '/book/login',
                    type: 'post',
                    data: {
                        user: userName,
                        pwd: pwd
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.result == "success") {
                            history.go(-1)
                            storage.setItem("userinfo", 1)
                        } else {
                            alert(data.mes)
                        }
                    }
                })
            } else {
                $.ajax({
                    url: '/book/reg',
                    type: 'post',
                    data: {
                        user: userName,
                        pwd: pwd
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.result == "success") {
                            alert('恭喜注册成功')
                        }
                    }
                })
            }
        }
    });
    $('.eye').on("click", function() {
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            $('.pwd').attr('type', 'text')
        } else {
            $('.pwd').attr('type', 'password')
        }
    })
});
// define([
//     'jquery'
// ], function($) {
//     var tip = "";
//     $('.loginbtn').on('click', function() {
//         var userName = $.trim($('.text').val()),
//             pwd = $.trim($('.pwd').val());
//         if (userName === "") {
//             tip = "请输入账号";
//         } else if (pwd === "") {
//             tip = "请输入密码";
//         };

//         if (tip) {
//             $('.tip').html(tip);
//         } else {
//             var data = {
//                 user: userName,
//                 pwd: pwd
//             };
//             $.ajax({
//                 url: "/loginuser",
//                 type: "post",
//                 data: data,
//                 dataType: "json",
//                 success: function(data) {
//                     if (data.result == "success") {
//                         history.go(-1)
//                     } else {
//                         $('.tip').html("用户和密码输入错误");
//                     }
//                 }
//             })
//         }
//     });
// });