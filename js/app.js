var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "tamplates/home.html",
            controller: 'myCtrl'
        })

        .state("services", {
            url: "/services",
            templateUrl: "tamplates/services.html",
            controller: 'log'
        })
        .state("seller_registration", {
            url: "/seller_registration",
            templateUrl: "tamplates/seller_registration.html",
            controller: 'reg'
        })
        .state("servcontent", {
            url: "/servcontent",
            templateUrl: "tamplates/servcontent.html",
            controller: 'info',
            params: { servcontents: null }
        })
        .state("about", {
            url: "/about",
            templateUrl: "tamplates/about.html",

        })
        .state("contact", {
            url: "/contact",
            templateUrl: "tamplates/contact.html",

        })
        .state("purchace", {
            url: "/purchace",
            templateUrl: "tamplates/purchace.html",
            controller: 'purchase',
            params: { new_param: null }
        })
        .state("cust_registration", {
            url: "/cust_registration",
            templateUrl: "tamplates/cust_registration.html",
            controller: 'custreg'
        })
        .state("cust_login", {
            url: "/cust_login",
            templateUrl: "tamplates/cust_login.html",
            controller: 'custlog',

        })
        .state("info", {
            url: "/info",
            templateUrl: "tamplates/info.html",
        })
        .state("video", {
            url: "/video",
            templateUrl: "tamplates/video.html",
        })
        .state("information", {
            url: "/information",
            templateUrl: "tamplates/information.html",
        })

      

})


myApp.controller('myCtrl', ['$scope', '$http', 'myService','$state', function ($scope, $http, myService,$state) {

   
    $http.get("http://localhost:56200/api/reg/image").then(function (res) {
        $scope.image = res.data;
    }       
)
$scope.selectdata = function (s) {
    myService.set(s);
    $scope.sellerName = s.sellerName;
    $scope.sellerPh = s.sellerPh;
    $scope.Qty = s.Qty;
    $scope.Price = s.Price;
    $scope.expDate = s.expDate;
}
$scope.onclick=function(){
    $state.go('cust_login')
}
}
])

myApp.controller('custlog', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.entity = {};


    var errmodal = document.getElementById("errModal");

    var spinnerModal = document.getElementById("spinnerModal");

    window.onclick = function (event) {
        if (event.target == errmodal) {
            errmodal.style.display = "none";
        }
    }

    $scope.buyer_login = function () {

        var param = {
            buyerUsername: $scope.entity.buyerUsername,
            buyerPass: $scope.entity.buyerPass

        };
        spinnerModal.style.display = "block";
        $http.get("http://localhost:56200/api/reg/buyer_login", { params: param }).then(function (res) {
            console.log(res)

            $state.go('purchace', { new_param: res.data });
            spinnerModal.style.display = "none";

        }, function (data) {
            spinnerModal.style.display = "none";
            errmodal.style.display = "block";
            $scope.entity.message = "Please Enter Correct Username and Password";
        })
    }

}])

myApp.controller('log', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.entity = {};


    var errmodal = document.getElementById("errModal");

    var spinnerModal = document.getElementById("spinnerModal");

    window.onclick = function (event) {
        if (event.target == errmodal) {
            errmodal.style.display = "none";
        }
    }

    $scope.login = function () {

        var param = {
            sellerUsername: $scope.entity.sellerUsername,
            sellerpass: $scope.entity.sellerpass
        };
        spinnerModal.style.display = "block";
        $http.get("http://localhost:56200/api/reg/seller_login", { params: param }).then(function (res) {
            console.log(res)
            spinnerModal.style.display = "none";
            $state.go('servcontent', { servcontents: res.data });

        }, function (data) {
            spinnerModal.style.display = "none";
            errmodal.style.display = "block";
            $scope.entity.message = "Please Enter Correct Username and Password";
        })
    }

}])

myApp.controller('custreg', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.entity = {};
    $scope.buyer_register = function () {
        var errmodal = document.getElementById("errModal");

        var spinnerModal = document.getElementById("spinnerModal");

        window.onclick = function (event) {
            if (event.target == errmodal) {
                errmodal.style.display = "none";
            }
        }

        if ($scope.entity.buyerPass == $scope.entity.buyerconfPass) {
            spinnerModal.style.display = "block";
            $http.post("http://localhost:56200/api/reg/buyer_register", $scope.entity).then(function (res) {
                console.log(res)
                spinnerModal.style.display = "none";
                $state.go('cust_login');
            }, function (data) {
                spinnerModal.style.display = "none";
                errmodal.style.display = "block";
                $scope.entity.message = "Please fill all the information";
            })
        } else {
            errmodal.style.display = "block";
            $scope.entity.message = "Password Not Matching";
        }
    }
    $scope.entity = {};

}])

myApp.controller('reg', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.entity = {};
    $scope.seller_register = function () {


        var errmodal = document.getElementById("errModal");

        var spinnerModal = document.getElementById("spinnerModal");

        window.onclick = function (event) {
            if (event.target == errmodal) {
                errmodal.style.display = "none";
            }
        }

        if ($scope.entity.sellerpass == $scope.entity.sellerconfpass) {
            spinnerModal.style.display = "block";
            $http.post("http://localhost:56200/api/reg/seller_register", $scope.entity).then(function (res) {

                spinnerModal.style.display = "none";
                $state.go('services');
            }, function (data) {
                spinnerModal.style.display = "none";
                errmodal.style.display = "block";
                $scope.entity.message = "Please fill all the information";
            })
        } else {
            errmodal.style.display = "block";
            $scope.entity.message = "Password Not Matching";
        }
    }


    $scope.entity = {};

}])

myApp.controller('info', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
    $scope.entity = {};
    $scope.entity = $stateParams.servcontents;




    $scope.addinfo = function () {
        $scope.entity.itemName = $scope.image;
        var date = new Date($scope.entity.adate);
        var month = date.getMonth() + 1;

        $scope.entity.adate = date.getFullYear() + '/' + month + '/' + date.getDate();

        $http.post("http://localhost:56200/api/reg/product_info", $scope.entity).then(function (res) {

            $scope.entity = {};
            $state.go('home');

        })

    }
}])

myApp.controller('purchase', ['$scope', '$http', '$stateParams', '$filter', 'myService', '$state', function ($scope, $http, $stateParams, $filter, myService, $state) {
    $scope.entity = {};
    $scope.entity = $stateParams.new_param;
    var selected_item = myService.get();
    $scope.entity.Price = selected_item.Price;
    $scope.entity.itemCode = selected_item.itemCode;

    $scope.entity.orderDate = new Date();
    var errmodal = document.getElementById("errModal");
    var spinnerModal = document.getElementById("spinnerModal");
    var today = $filter('date')(new Date(), 'yyyy-MM-dd');

    $scope.entity.orderDate = today;
    window.onclick = function (event) {
        if (event.target == errmodal) {
            errmodal.style.display = "none";
        }
    }

    $scope.cal = function () {
        $scope.entity.DueAmt = parseFloat($scope.entity.Price) - parseFloat($scope.entity.PaidAmt);
    }

    $scope.Pinfo = function () {
        spinnerModal.style.display = "block";

        $http.post("http://localhost:56200/api/reg/order_info", $scope.entity).then(function (res) {
            console.log(res)
            spinnerModal.style.display = "none";
            errmodal.style.display = "block";
            $scope.entity.message = "Successfull";

        },
            function (data) {
                spinnerModal.style.display = "none";

            })
    }

    $scope.Export = function () {
        html2canvas(document.getElementById('bill'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("bill.pdf");
                $state.go('home');
            }
        });
    }
}])



myApp.directive('imgUpload', ['$rootScope', function (rootScope) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var canvas = document.createElement("canvas");
            var extensions = 'jpeg ,jpg, png, gif';
            elem.on('change', function () {
                reader.readAsDataURL(elem[0].files[0]);
                var filename = elem[0].files[0].name;

                var extensionlist = filename.split('.');
                var extension = extensionlist[extensionlist.length - 1];
                if (extensions.indexOf(extension) == -1) {
                    alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");

                } else {
                    scope.file = elem[0].files[0];
                    scope.imageName = filename;
                }
            });

            var reader = new FileReader();
            reader.onload = function (e) {

                scope.image = e.target.result;
                scope.$apply();

            }
        }
    }
}]);


myApp.factory('myService', function () {

    var savedData = {}

    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

})

myApp.directive('exportToPdf', function () {

    return {
        restrict: 'E',
        scope: {
            elemId: '@'
        },
        template: '<button data-ng-click="exportToPdf()">Export to PDF</button>',
        link: function (scope, elem, attr) {

            scope.exportToPdf = function () {

                var doc = new jsPDF();



                doc.fromHTML(
                    document.getElementById(scope.elemId).innerHTML, 15, 15, {
                    'width': 170
                });

                doc.save('a4.pdf')

            }
        }
    }

});