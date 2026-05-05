import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
export const gerarTermoPDF = async (dados) => {
  try {
    const htmlContent = `
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <style>
            * {
              font-family: "Popppins", sans-serif;
              padding: 0;
              margin: 0;
            }
            p {
              font-family: "Poppins", sans-serif;
            }

            body {
              color: #000;
              box-sizing: border-box;
            }

            .info-table {
              width: 100%;
              margin-bottom: 20px;
            }
            .info-table td {
              padding: 5px 0;
            }
            hr {
              border: 0;
              border-top: 1px solid #ccc;
              margin: 20px 0;
            }

            .signature-section {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              margin-top: 40px;
            }
            .signature-box {
              width: 30%;
              text-align: center;
              min-width: 200px;
              margin-bottom: 30px;
            }
            .sig-img {
              width: 100%;
              max-width: 200px;
              height: auto;
              border-bottom: 1px solid #000;
            }
            .sig-empty {
              width: 100%;
              max-width: 200px;
              height: 60px;
              border-bottom: 1px solid #000;
              margin: 0 auto;
            }
            .sig-label {
              font-size: 12px;
              margin-top: 5px;
              font-weight: bold;
            }
            .sig-sub {
              font-size: 10px;
              color: #555;
            }

            .div-header {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              background-color: #003fa3;
              padding: 20px;
              color: #fff;
              align-items: center;
            }

            .data-hora {
              font-weight: 300;
              font-size: 12px;
              margin: 4px 0;
            }

            .div-visita {
              display: flex;
              flex-direction: column;
              gap: 0;
              padding: 20px;
              margin-top: 10px;
            }
            .div-assinatura {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              gap: 0;
              padding: 20px;
              margin-top: 10px;
            }

            .div-infos {
              background-color: #e2e2eb;
              border-radius: 2px;
              padding: 8px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
          </style>
        </head>
        <body>
          <div class="div-header">
            <div>
              <p style="font-size: 22px">${dados.unidade}</p>
            </div>
            <div style="text-align: end">
              <p style="font-weight: 300; font-size: 24px; letter-spacing: 20px">
                TERMO DE VISITA
              </p>
              <p class="data-hora">
                Data: <span style="font-size: 12px">${dados.data}</span>
              </p>
              <p class="data-hora">${dados.chegada} às ${dados.saida}</p>
            </div>
          </div>
          <div class="div-visita">
            <p
              style="
                color: #003fa3;
                font-weight: 500;
                border-bottom: 2px solid #e2e2eb;
                margin-bottom: 6px;
                padding-bottom: 10px;
              "
            >
              DETALHES DA VISITA
            </p>
            <div style="display: flex; flex-direction: column; gap: 14px">
              <div class="div-infos">
                <div style:"width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; ">
                  <p style="color: #5d5e65">Equipamento / Nº de Série</p>
                  <p style="font-size: 10px; color: #000;">${dados.numeroSerie}</p>
                </div>
                <p>${dados.equipamento}</p>
              </div>
              <div class="div-infos">
                <p style="color: #5d5e65">Motivos</p>
                <p>${dados.motivos.join(", ")}</p>
              </div>
              <div class="div-infos">
                <p style="color: #5d5e65">Serviço Realizado</p>
                <p>${dados.servico}</p>
              </div>
              <div class="div-infos">
                <p style="color: #5d5e65">Situação Final</p>
                <p>${dados.situacao.join(", ")}</p>
              </div>
              <div class="div-infos">
                <p style="color: #5d5e65">Observações</p>
                <p>${dados.obsTecnicas}</p>
              </div>
            </div>
          </div>

          <div class="div-visita">
            <p
              style="
                color: #003fa3;
                font-weight: 500;
                border-bottom: 2px solid #e2e2eb;
                margin-bottom: 6px;
                padding-bottom: 10px;
              "
            >
              Assinaturas
            </p>
            <div class="div-assinatura">
              <div class="signature-box">
                ${
                  dados.imgAssinaturaResponsavel
                    ? `<img
                  src="${dados.imgAssinaturaResponsavel}"
                  class="sig-img"
                />`
                    : '<div class="sig-empty"></div>'
                }
                <p class="sig-label">
                  ${dados.responsavelNome || "_________________________"}
                </p>
                <p class="sig-sub">${dados.responsavelCargo || "Cargo"}</p>
                <p class="sig-sub">Responsável / Testemunha Unidade</p>
              </div>

              <div class="signature-box">
                ${
                  dados.imgAssinaturaTecnico
                    ? `<img
                  src="${dados.imgAssinaturaTecnico}"
                  class="sig-img"
                />`
                    : '<div class="sig-empty"></div>'
                }
                <p class="sig-label">${dados.tecnico}</p>
                <p class="sig-sub">Matrícula: ${dados.matricula}</p>
                <p class="sig-sub">Técnico TIC</p>
              </div>
            </div>
          </div>
        </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Não foi possível gerar o PDF. Tente novamente.");
  }
};
