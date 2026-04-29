import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
export const gerarTermoPDF = async (dados) => {
  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #000; }
            h2 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .info-table { width: 100%; margin-bottom: 20px; }
            .info-table td { padding: 5px 0; }
            hr { border: 0; border-top: 1px solid #ccc; margin: 20px 0; }
            
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
            .sig-label { font-size: 12px; margin-top: 5px; font-weight: bold; }
            .sig-sub { font-size: 10px; color: #555; }
          </style>
        </head>
        <body>
          <h2>CONTROLE DE VISITA TÉCNICA - IPOJUCA</h2>
          
          <table class="info-table">
            <tr>
              <td><strong>Unidade:</strong> ${dados.unidade}</td>
              <td style="text-align: right;"><strong>Data:</strong> ${dados.data}</td>
            </tr>
            <tr>
              <td><strong>Técnico:</strong> ${dados.tecnico}</td>
              <td style="text-align: right;"><strong>Matrícula:</strong> ${dados.matricula}</td>
            </tr>
            <tr>
              <td colspan="2"><strong>Horário:</strong> ${dados.chegada} às ${dados.saida}</td>
            </tr>
          </table>

          <hr/>
          <p><strong>Motivos:</strong> ${dados.motivos.join(", ")}</p>
          <p><strong>Equipamento/Setor:</strong> ${dados.equipamento}</p>
          <p><strong>Serviço Realizado:</strong> ${dados.servico}</p>
          <p><strong>Situação Final:</strong> ${dados.situacao.join(", ")}</p>
          <p><strong>Observações:</strong> ${dados.obsTecnicas}</p>

          <div class="signature-section">
            <div class="signature-box">
              ${dados.imgAssinaturaResponsavel ? `<img src="${dados.imgAssinaturaResponsavel}" class="sig-img" />` : '<div class="sig-empty"></div>'}
              <p class="sig-label">${dados.responsavelNome || "_________________________"}</p>
              <p class="sig-sub">${dados.responsavelCargo || "Cargo"}</p>
              <p class="sig-sub">Responsável Unidade</p>
            </div>

            <div class="signature-box">
              ${dados.imgAssinaturaTecnico ? `<img src="${dados.imgAssinaturaTecnico}" class="sig-img" />` : '<div class="sig-empty"></div>'}
              <p class="sig-label">${dados.tecnico}</p>
              <p class="sig-sub">Matrícula: ${dados.matricula}</p>
              <p class="sig-sub">Técnico de TIC</p>
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
