function myFunction() {
  //localizar planilha
  var sheet = SpreadsheetApp.openByUrl(/*url da planillha*/);
  
  const numPessoas = sheet.getLastRow();

  var listaNomes = sheet.getActiveSheet().getRange("Aniversários!A2:A"+numPessoas.toString()).getValues();
  var dataNascimento = sheet.getActiveSheet().getRange("Aniversários!C2:C"+numPessoas.toString()).getValues();

  var dataHoje = new Date().toLocaleDateString('pt-BR');
  var diaMesHoje = dataHoje.substring(0, 5);

  for (var i = 0; i < dataNascimento.length; i++) {
    
  var aniversario = dataNascimento[i].toString().substring(0, 5);

  if (diaMesHoje == aniversario) {

    var nomeCompleto = listaNomes[i].toString().split(" ");
    var primeiroNome = nomeCompleto[0];
    
    //const url = /*url do chat*/;

    const options = {
    "method": "post",
    "headers": {
    "Content-Type": "application/json; charset=UTF-8"
    },
    "payload": JSON.stringify({
    "cards": [{
            "header": {
                "title": "Hoje é dia de FESTA",
                "subtitle": ""+listaNomes[i]+"",
                "imageUrl": "https://cdn-icons-png.flaticon.com/128/7626/7626666.png",
                "imageStyle": "IMAGE"
            },
            "sections": [{
                "widgets": [{
                        "textParagraph": {
                            "text": "Feliz aniversário, <font color=\"#FF0000\">"+primeiroNome+"</font>! A diretoria de Gente e Cultura aprecia o membro valioso que és.",
                        }
                    },
                    {
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
    Logger.log(response); 
    }
}
}
