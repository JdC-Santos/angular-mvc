angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto, cadastroDeFotos, $routeParams) {
    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoId) {
        recursoFoto.get({ fotoId: $routeParams.fotoId }, function (foto) {
            $scope.foto = foto;
        }, function (error) {
            console.log(error);
            $scope.mensagem = "Não foi possivel carregar a foto";
        });
    }

    $scope.submeter = function () {

        if ($scope.formulario.$valid) {
            cadastroDeFotos.cadastrar($scope.foto)
                .then(function (data) {
                    $scope.mensagem = data.mensagem;

                    if (data.inclusao) {
                        $scope.foto = {};
                    }

                }).catch(function (data) {
                    $scope.mensagem = data.mensagem;
                });
        } else {
            $scope.mensagem = 'Campos inválidos';
        }
    }
});