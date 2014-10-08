var watch = 0;
            var cnv;
            var target;
            var xPos;
            var yPos;
            var canvas;

            window.onload = function()
            {
                document.addEventListener("deviceready", init, false);
                window.addEventListener("orientationchange", doOnOrientationChange, true);
            }

            function init()
            {
                // captura as medidas internas da janela
                var iW = window.innerWidth;
                var iH = window.innerHeight;
                //captura o elemento canvas
                canvas= document.getElementById('myCanvas');
                // define o contexto 2D para o canvas
                cnv = canvas.getContext("2d");
                // define as medidas do canvas
                cnv.canvas.width = iW;
                cnv.canvas.height = iH-40;
                // cria uma nova imagem
                target = new Image();
                // define o arquivo da imagem
                target.src = "crosshair.png";
                // define a posição inicial da imagem na tela (centro da tela)
                xPos = (iW-target.width)/2;
                yPos = (iH-target.height)/2;
                target.onload = function()
                {
                    // desenha a imagem no canvas nas posições inicias definidas
                    cnv.drawImage(target, xPos, yPos);
                }
                // inicia o monitoramento do acelerômetro
                watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 25});

            }

            function success(accel)
            {
                // exibe os valores para X, Y e Z do acelerômetro
                document.getElementById("xOut").innerHTML = accel.x;
                document.getElementById("yOut").innerHTML = accel.y;
                document.getElementById("zOut").innerHTML = accel.z;
                // limpa o canvas
                cnv.clearRect(0, 0, canvas.width, canvas.height);
                // redefine a posição da imagem com base nos valores de X e Y do acelerômetro
                xPos += -1*(accel.x * 1.5);
                yPos += (accel.y * 1.5);

                // evita que a imagem seja deslocada para fora do canvas
                xPos = Math.min(Math.max(xPos, 0), canvas.width-target.width);
                yPos = Math.min(Math.max(yPos, 0), canvas.height-target.height);

                // redesenha a imagem no canvas
                cnv.drawImage(target, xPos, yPos);
                // exibe as coordenadas da imagem no canvas
                document.getElementById("xImg").innerHTML = xPos;
                document.getElementById("yImg").innerHTML = yPos;
                // exibe as dimensões do canvas
                document.getElementById("dimCanvas").innerHTML = canvas.width + ' x ' +
                    canvas.height;
            }

            function failure()
            {
                alert("Error");
            }

            // resposta a mudança de orientação (portrait x landscape)
            function doOnOrientationChange()
            {
                switch(window.orientation)
                {
                  case -90:
                  case 90:
                    alert('landscape');
                    break;
                  default:
                    alert('portrait');
                    break;
                }
            }
