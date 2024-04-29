function raTimBum() {

  // Abrir planilha pela url.
  var sheetUrl = PropertiesService.getScriptProperties().getProperty("sheet");
  var sheet = SpreadsheetApp.openByUrl(sheetUrl);

  // Constante para pegar a última linha da planilha, será usado na hora de determinar o range de valores nome e data de nascimento. como a planilha pode aumentar/diminuir, essa constante evita que uma linha fique de fora ou que uma linha vazia seja analisada.
  const numPessoas = sheet.getLastRow(); 

  // Pegar valores nome e data de aniversário em lista.
  var Date_of_birth_List = sheet.getActiveSheet().getRange("Aniversários!D2:D"+numPessoas.toString()).getValues();
  var Names_list = sheet.getActiveSheet().getRange("Aniversários!A2:A"+numPessoas.toString()).getValues();

  // Pega data e mês atual em lista.
  var hoje = new Date();
  var dia_hoje = new Date(hoje).getDate(); // se ligar que retorna -1 do valor
  var mes_hoje = new Date(hoje).getMonth(); // se ligar que retorna -1 do valor

  // Percorre cada linha e checa se é a data de aniversário para poder enviar.
  for(i = 0; i < Date_of_birth_List.length; i++){
  
    // Pega valores de data e nome específicos de acordo com o índice/linha da planilha sendo analisada e transforma em variável.
    var data_aniversario = Date_of_birth_List[i];
    var nome = Names_list[i].toString();

    // Conferir se retorna o valor certo.
    Logger.log(data_aniversario);
    
    // Transforma variável de datas (em string) em formato Date e separa dia e mês.
    var dia_aniversario = new Date(data_aniversario).getDate(); // se ligar que retorna -1 do valor
    var mes_aniversario = new Date(data_aniversario).getMonth(); // se ligar que retorna -1 do valor

    // Comparação entre data atual e datas na planilha.
    if (dia_aniversario == dia_hoje && mes_aniversario == mes_hoje) {
      
      // Url do chat onde está integrado o webhook
      const url = PropertiesService.getScriptProperties().getProperty("url");

      // Estrutura do card.
      const options = {
      "method": "post",
      "headers": {
      "Content-Type": "application/json; charset=UTF-8"
      },
      "payload": JSON.stringify({
      "cards": [{
            // Cabeçalho do card.
            "header": {
                "title": "Hoje é dia de FESTA",
                "subtitle": ""+nome+"",
                "imageUrl": "https://cdn-icons-png.flaticon.com/128/7626/7626666.png",
                "imageStyle": "IMAGE"
            },
            // Mensagem no card.
            "sections": [{
                "widgets": [{
                      "textParagraph": {
                          "text": "Feliz aniversário, <font color=\"#FF0000\">"+nome+"</font>! \nDesejamos dias incríveis e brilhantes para você! \nCurta bastante seu dia!💎",
                      }
                  },
                  {
                    // Botão "Uhuuul" com link para gif.
                    "buttons": [{
                        "textButton": {
                            "text": "Uhuuul",
                            "onClick": {
                                "openLink": {
                                    "url": "https://shorturl.at/qyJN2"
                                }
                            }
                        }
                    }]
                  },
                ]
            }]
          }]
        })
      };
      const response = UrlFetchApp.fetch(url, options);
    }
  }
}
