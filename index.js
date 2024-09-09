

const grupe = require('./groups.json');
const form = require('./exibitions.json');
const timovi = grupe;
const forme = form;
const grupe1 =[];
let utakmice = [];


const igra = (tim1, tim2, rang1, rang2, forma1, forma2) => {

    const sumaRangova = rang1 + rang2;
    let verovatnocaTima1 = rang2 / sumaRangova;
    let verovatnocaTima2 = rang1 / sumaRangova

    const faktorForme = forma1 - forma2;
    verovatnocaTima1 += faktorForme * 0.01;

    const randomBroj = Math.random();
    let predaja;
    if (randomBroj<0.98) {
        predaja = false
    } else {
        predaja = true
    }
    //console.log(predaja)
    const generisanjeRezultata = () => {
        return Math.floor(Math.random() * (70)) + 50;
    }
     let rez1=generisanjeRezultata();
     let rez2=generisanjeRezultata() ;

     if (randomBroj < verovatnocaTima1) {
        while (rez1 <= rez2) {
            rez1 = generisanjeRezultata() + 1;
        }
    } else if (randomBroj >= verovatnocaTima1) {
        while (rez1 >= rez2) {
            rez2 = generisanjeRezultata() + 1;
        }
    }

//console.log(`${verovatnocaTima1} vs ${verovatnocaTima2}`)
//console.log(randomBroj)
//console.log(`${forma1} vs ${forma2}`)
console.log(` ${tim1} vs ${tim2}: ${rez1} - ${rez2}`);
    if (rez1 > rez2 && !predaja) {
        return { pobednik: tim1, 
                porazeni: tim2, 
                poeni_pobednika: 2, 
                poeni_porazenog: 1,
                postignuti_kosevi_pobednika: rez1 ,
                primljeni_kosevi_pobednika: rez2,
                postignuti_kosevi_gubitnika: rez2,
                primljeni_kosevi_gubitnika: rez1,
                predaja: predaja, 
               
                };
    } else if (rez2 > rez1 && !predaja) {
        return { pobednik: tim2, 
                porazeni: tim1, 
                poeni_pobednika: 2, 
                poeni_porazenog: 1,
                postignuti_kosevi_pobednika: rez2 ,
                primljeni_kosevi_pobednika: rez1,
                postignuti_kosevi_gubitnika: rez1,
                primljeni_kosevi_gubitnika: rez2,
                predaja: predaja,
         
                };

        }  else if (rez1 > rez2 && predaja) {
            return  { pobednik: tim1, 
              porazeni: tim2,
              poeni_pobednika: 2, 
              poeni_porazenog: 0,
              postignuti_kosevi_pobednika: rez1 ,
              primljeni_kosevi_pobednika: rez2,
              postignuti_kosevi_gubitnika: rez2,
              primljeni_kosevi_gubitnika: rez1,
              predaja: predaja,
                    
         }
        } else if (rez1 < rez2 && predaja) {
            return  { pobednik: tim2, 
              porazeni: tim1, 
              poeni_pobednika: 2, 
              poeni_porazenog: 0,
              postignuti_kosevi_pobednika: rez2 ,
              primljeni_kosevi_pobednika: rez1,
              postignuti_kosevi_gubitnika: rez1,
              primljeni_kosevi_gubitnika: rez2,
              predaja: predaja,
                    
         }
        }
        
        else {
        console.log('Greska')
    }
}

function grupnaFaza(x , d) {
    const teams = [];
    for (let i=0 ; i<x.length; i++) {
     teams.push(x[i].Team);
    }
    const rank = [];
    for (let i=0 ; i<x.length; i++) {
        rank.push(x[i].FIBARanking)
    }

    const oznake = [];
    const predhodneUtakmice=[];
    for (let i=0 ; i<x.length; i++) {
        oznake.push(x[i].ISOCode)
        predhodneUtakmice.push(d[x[i].ISOCode])
    }

    const forma = [];
    let ukPostignuti;
    let ukPrimljeni;
    for (let i = 0; i < predhodneUtakmice.length; i++) {
        ukPostignuti = 0;
        ukPrimljeni = 0;
        for (let j = 0; j < predhodneUtakmice[i].length; j++) {
            let rez = predhodneUtakmice[i][j].Result.split("-");
            let postignuti = parseInt(rez[0]);
            let primljeni = parseInt(rez[1]);
        ukPostignuti += postignuti;
        ukPrimljeni += primljeni;
        
    }
    //console.log(ukPostignuti)
    //console.log(ukPrimljeni)
    forma.push(ukPostignuti/2-ukPrimljeni/2) 
}
    const bodovi = {};
    const broj_pobeda = {};
    const broj_poraza = {};
    const postignuti_kosevi = {};
    const primljeni_kosevi = {};
    const brojUtakmica = {}

    const rezultat = [];

    teams.forEach(team => {
        bodovi[team] = 0;
    });

    teams.forEach(team => {
        broj_pobeda[team] = 0;
    });

    teams.forEach(team => {
        broj_poraza[team] = 0;
    });

    teams.forEach(team => {
        postignuti_kosevi[team] = 0;
    });

    teams.forEach(team => {
        primljeni_kosevi[team] = 0;
    });

    teams.forEach(team => {
        brojUtakmica[team] = 0;
    });

    const matches = [
        [teams[0], teams[1], rank[0], rank[1], forma[0], forma[1]],
        [teams[2], teams[0], rank[2], rank[0], forma[2], forma[0]],
        [teams[0], teams[3], rank[0], rank[3], forma[0], forma[3]],
        [teams[1], teams[2], rank[1], rank[2], forma[1], forma[2]],
        [teams[3], teams[1], rank[3], rank[1], forma[3], forma[1]],
        [teams[2], teams[3], rank[2], rank[3], forma[2], forma[3]]
    ];

    matches.forEach(match => {
        const rezultati = igra(match[0], match[1], match[2], match[3], match[4], match[5] );
        if (rezultati.pobednik !== null) {
            bodovi[rezultati.pobednik] += rezultati.poeni_pobednika;
            broj_pobeda[rezultati.pobednik] += rezultati.poeni_pobednika/2;
            postignuti_kosevi[rezultati.pobednik] += rezultati.postignuti_kosevi_pobednika;
            primljeni_kosevi[rezultati.pobednik] += rezultati.primljeni_kosevi_pobednika;
            bodovi[rezultati.porazeni] += rezultati.poeni_porazenog;
            broj_poraza[rezultati.porazeni] += rezultati.poeni_porazenog;
            postignuti_kosevi[rezultati.porazeni] += rezultati.postignuti_kosevi_gubitnika;
            primljeni_kosevi[rezultati.porazeni] += rezultati.primljeni_kosevi_gubitnika;
            brojUtakmica[rezultati.pobednik] += 1;
            brojUtakmica[rezultati.porazeni] += 1;
        }
        if (rezultati.predaja) {
            console.log(`Ekipa koja je predala meč: ${rezultati.porazeni}`)
            console.log(``)
        }
       
        utakmice.push({
           pobednik: rezultati.pobednik,
           porazeni: rezultati.porazeni,
           postignuti_kosevi_pobednika: rezultati.postignuti_kosevi_pobednika,
           primljeni_kosevi_pobednika: rezultati.primljeni_kosevi_pobednika,
           postignuti_kosevi_gubitnika: rezultati.postignuti_kosevi_gubitnika,
           primljeni_kosevi_gubitnika: rezultati.primljeni_kosevi_gubitnika,
        })
    });

    for (let i = 0; i < teams.length; i++) {
        let team = teams[i];
        let razlika = postignuti_kosevi[team] - primljeni_kosevi[team];
        rezultat.push({
            tim: team,
            rank: rank[i],
            oznake: oznake[i], 
            pobede: broj_pobeda[team],
            porazi: broj_poraza[team],
            bodovi: bodovi[team],
            dati_kosevi: postignuti_kosevi[team],
            primljeni_kosevi: primljeni_kosevi[team],
            razlika: razlika,
            brojUtakmica: brojUtakmica[team],
            forma: (postignuti_kosevi[team]/brojUtakmica[team])-(primljeni_kosevi[team]/brojUtakmica[team])
    })
       
    }
   // console.log(rezultat)
   //console.log(predhodneUtakmice)
  //console.log(forma)
    return [rezultat, utakmice];
    }



    function sortiranje (arr, ut) {
       
        const nizovi = [];
        const duplikati = [];
        const brojac = {};
        let konacno;
        let sortiraniTimovi;

        arr.sort((a, b) => b.bodovi-a.bodovi)

        arr.forEach((item, index) => {

            if (brojac[item.bodovi]) {
                duplikati.push(item);
                brojac[item.bodovi]++;
            } else {
                const nextIndex = arr.findIndex((team, i) => team.bodovi === item.bodovi && i > index);
                if (nextIndex !== -1) {
                    duplikati.push(item);
                    brojac[item.bodovi] = 1;
                } else {
                    nizovi.push(item);
                }
            }
        });

        const duplikat=(Object.values(brojac));
    //   console.log(nizovi)
    //   console.log(duplikat[0])
    //   console.log(duplikati)
    //   console.log(brojac)
       if (duplikati.length > 0 ) {
           
                if (duplikat[0] == 2 ) {
                for (let i = 0; i < duplikati.length - 1; i +=2) {
                    teamA = duplikati[i].tim;
                    teamB = duplikati[i+1].tim;
                    const zadnjaUtakmica = ut.find(game => {
                    return (
                        (game.pobednik === teamA && game.porazeni === teamB) ||
                        (game.pobednik === teamB && game.porazeni === teamA)                                   
                    )
                    });
                
                    if (!zadnjaUtakmica) {
                        console.log('Greška')
                    }
                    //console.log('Rezultat zadnje utakmice:', 'pobednik:',zadnjaUtakmica.pobednik,'', 'porazeni:', zadnjaUtakmica.porazeni);
                    
                    duplikati.sort((a, b) => {
                        if (a.tim === zadnjaUtakmica.pobednik) return -1;
                        if (a.tim === zadnjaUtakmica.porazeni) return 1;  
                                                
                    });
                }
                    konacno=nizovi.concat(duplikati);
                    konacno.sort((a, b) => b.bodovi-a.bodovi)
                }

                else if (duplikat[0] >= 3 ){
                            const teams = duplikati;

                            function razlikaBodova(ut, teams) {
                            const razlike = {};

    
                            teams.forEach(team => {
                                razlike[team.tim] = 0;
                            });

                            const igraniMecevi = ut.filter(match => 
                                teams.some(team => team.tim === match.pobednik) && 
                                teams.some(team => team.tim === match.porazeni)
                              );

                            igraniMecevi.forEach(match => {
                                const pobednik = match.pobednik;
                                const porazeni = match.porazeni;
                                const poeni_pobednika = match.postignuti_kosevi_pobednika;
                                const poeni_porazenog = match.postignuti_kosevi_gubitnika;

                                razlike[pobednik] += poeni_pobednika - poeni_porazenog;
                                razlike[porazeni] += poeni_porazenog - poeni_pobednika;
                            });

                            return razlike;
                            }
                            function sortiranjePoRaz(razlike, teams) {
                                console.log('')
                               // console.log(razlike)
                                return teams.sort((a, b) => razlike[b.tim] - razlike[a.tim]);
                              }
                            

                            const bodRazlika = razlikaBodova(ut, teams);
                            sortiraniTimovi = sortiranjePoRaz(bodRazlika, teams);

                            konacno=nizovi.concat(sortiraniTimovi);
                            konacno.sort((a, b) => b.bodovi-a.bodovi)
                }
                else {
                    nizovi
                }
            
    } else {
        //console.log('Nema duplikata');
        konacno=nizovi
        }
       
     
        
       // console.log(konacno)
        
        console.log('');
        console.log('Konačan plasman u grupi:');
        konacno.forEach(team => {
            console.log(`${team.oznake}:  pobede: ${team.pobede} / porazi: ${team.porazi} / poeni: ${team.bodovi} / postigniti kosevi: ${team.dati_kosevi} / primljeni kosevi: ${team.primljeni_kosevi} / kos razlika: ${team.razlika}`);
          });
        grupe1.push(konacno)
    }

// simulacija grupne faze
function simulacija (y, m) {
    console.log('Grupna faza - I kolo:')
    console.log('')
    console.log('Grupa A:')
    sortiranje(...grupnaFaza(y.A, m)),
    console.log('')
    console.log('Grupa B:')
    sortiranje(...grupnaFaza(y.B, m)),
    console.log('')
    console.log('Grupa C:')
    sortiranje(...grupnaFaza(y.C, m))
    }
simulacija(timovi, forme)

//console.log(grupe1)

let prviNiz= [];
let drugiNiz= [];
let treciNiz= [];
grupe1.forEach(prvi => {
    prviNiz.push(prvi[0]);
    drugiNiz.push(prvi[1]);
    treciNiz.push(prvi[2]);
})

//Grupna faza-sortiranje

const sortt = (t) => {
    t.sort((a, b) => {
        if (a.bodovi !== b.bodovi) {
          return b.bodovi - a.bodovi; 
        } else if (a.razlika !== b.razlika) {
          return b.razlika - a.razlika; 
        } else {
          return b.dati_kosevi - a.dati_kosevi;
        }
      });

}
sortt(prviNiz);
sortt(drugiNiz);
sortt(treciNiz);

const konacan_plasman = prviNiz.concat(drugiNiz, treciNiz);
konacan_plasman.pop()

console.log('');
console.log('Ekipe koje nastavljaju takmičnje: ');
konacan_plasman.forEach((team, index) => {
    console.log(`${index + 1}. ${team.oznake}: pobede: ${team.pobede} / porazi: ${team.porazi} / poeni: ${team.bodovi} / postigniti kosevi: ${team.dati_kosevi} / primljeni kosevi: ${team.primljeni_kosevi} / kos razlika: ${team.razlika}`);
  });

// Šešir
const D=[];
const E=[];
const F=[];
const G=[];

D.push(konacan_plasman[0], konacan_plasman[1]);
E.push(konacan_plasman[2], konacan_plasman[3]);
F.push(konacan_plasman[4], konacan_plasman[5]);
G.push(konacan_plasman[6], konacan_plasman[7]);

console.log('')
console.log('')
console.log(`Šešir D:
        ${D[0].tim}
        ${D[1].tim}`)
console.log(`Šešir E:
        ${E[0].tim}
        ${E[1].tim}`)
console.log(`Šešir F:
        ${F[0].tim}
        ${F[1].tim}`)
console.log(`Šešir G:
        ${G[0].tim}
        ${G[1].tim}`)


//CETVRTFINALE
const timoviCetvrt= [];
const polufinalisti=[];
const cetvrtFinale = (a, b, c) => {
    let tim1;
    let tim2;
    let tim3;
    let tim4;
    let igra1;
    let igra2;
    const susret = (team1, team2) => 
     {
        for (const group in timovi) {
            const teams = timovi[group];
            const tim1uGrupi = teams.some(t => t.Team === team1.tim);
            const tim2uGrupi = teams.some(t => t.Team === team2.tim);
          
              if (tim1uGrupi && tim2uGrupi) {
                return true;
              }
            }
            return false;
          }

    do {    
    tim1 = a[Math.floor(Math.random() * 2)];
    tim2 = b[Math.floor(Math.random() * 2)];
    igra1 = susret(tim1, tim2)
    tim3=a.filter((n) => n !== tim1)[0];
    tim4=b.filter((n) => n !== tim2)[0];
    igra2 = susret(tim3, tim4)
    }
    while ( igra1 || igra2)
        console.log(` ${tim1.tim} - ${tim2.tim}`)
        console.log(` ${tim3.tim} - ${tim4.tim}`)
    
        timoviCetvrt.push(tim1, tim2, tim3, tim4);
}
console.log('')
console.log('Eliminaciona faza: ')
cetvrtFinale(D, G, utakmice);
cetvrtFinale(E, F, utakmice);

//console.log(timoviCetvrt)
console.log('')
console.log('Četvrtfinale: ')
for (let i = 0; i < timoviCetvrt.length - 1; i +=2) {
    let m = igra(timoviCetvrt[i].tim, timoviCetvrt[i + 1].tim, timoviCetvrt[i].rank, timoviCetvrt[i + 1].rank, timoviCetvrt[i].forma, timoviCetvrt[i + 1].forma);
    if (timoviCetvrt[i].tim === m.pobednik ) {
        timoviCetvrt[i].dati_kosevi += m.postignuti_kosevi_pobednika
        timoviCetvrt[i].primljeni_kosevi += m.primljeni_kosevi_pobednika
        timoviCetvrt[i].brojUtakmica += 1
        timoviCetvrt[i].forma += (timoviCetvrt[i].dati_kosevi/timoviCetvrt[i].brojUtakmica-timoviCetvrt[i].primljeni_kosevi/timoviCetvrt[i].brojUtakmica)
    }
    else {
        timoviCetvrt[i+1].dati_kosevi += m.postignuti_kosevi_pobednika
        timoviCetvrt[i+1].primljeni_kosevi += m.primljeni_kosevi_pobednika
        timoviCetvrt[i+1].brojUtakmica += 1
        timoviCetvrt[i+1].forma += (timoviCetvrt[i+1].dati_kosevi/timoviCetvrt[i+1].brojUtakmica-timoviCetvrt[i+1].primljeni_kosevi/timoviCetvrt[i+1].brojUtakmica)
    }
    polufinalisti.push(timoviCetvrt[i].tim === m.pobednik ? timoviCetvrt[i] : timoviCetvrt[i + 1]);
}

//console.log(polufinalisti)

// POLUFINALE 
const finale = [];
const treceMesto= [];

console.log('')
console.log('Polufinale: ')
for (let i = 0; i < polufinalisti.length - 1; i +=2) {
    let finalisti = igra(polufinalisti[i].tim, polufinalisti[i + 1].tim, polufinalisti[i].rank, polufinalisti[i + 1].rank, polufinalisti[i].forma, polufinalisti[i + 1].forma)

if (polufinalisti[i].tim === finalisti.pobednik ) {
    polufinalisti[i].dati_kosevi += finalisti.postignuti_kosevi_pobednika
    polufinalisti[i].primljeni_kosevi += finalisti.primljeni_kosevi_pobednika
    polufinalisti[i].brojUtakmica += 1
    polufinalisti[i].forma += (polufinalisti[i].dati_kosevi/polufinalisti[i].brojUtakmica-polufinalisti[i].primljeni_kosevi/polufinalisti[i].brojUtakmica)
}
else {
    polufinalisti[i+1].dati_kosevi += finalisti.postignuti_kosevi_pobednika
    polufinalisti[i+1].primljeni_kosevi += finalisti.primljeni_kosevi_pobednika
    polufinalisti[i+1].brojUtakmica += 1
    polufinalisti[i].forma += (polufinalisti[i+1].dati_kosevi/polufinalisti[i+1].brojUtakmica-polufinalisti[i+1].primljeni_kosevi/polufinalisti[i+1].brojUtakmica)
}
if (polufinalisti[i].tim === finalisti.porazeni ) {
    polufinalisti[i].dati_kosevi += finalisti.postignuti_kosevi_gubitnika
    polufinalisti[i].primljeni_kosevi += finalisti.primljeni_kosevi_gubitnika
    polufinalisti[i].brojUtakmica += 1
    polufinalisti[i].forma += (polufinalisti[i].dati_kosevi/polufinalisti[i].brojUtakmica-polufinalisti[i].primljeni_kosevi/polufinalisti[i].brojUtakmica)
}
else {
    polufinalisti[i+1].dati_kosevi += finalisti.postignuti_kosevi_gubitnika
    polufinalisti[i+1].primljeni_kosevi += finalisti.primljeni_kosevi_gubitnika
    polufinalisti[i+1].brojUtakmica += 1
    polufinalisti[i].forma += (polufinalisti[i+1].dati_kosevi/polufinalisti[i+1].brojUtakmica-polufinalisti[i+1].primljeni_kosevi/polufinalisti[i+1].brojUtakmica)
}

finale.push(polufinalisti[i].tim === finalisti.pobednik ? polufinalisti[i]: polufinalisti[i+1]);
treceMesto.push(polufinalisti[i].tim === finalisti.porazeni ? polufinalisti[i]: polufinalisti[i+1])

}



//TRECE MESTO
console.log('')
console.log('Utakmica za treće mesto: ')
const trece =  igra(treceMesto[0].tim, treceMesto[1].tim, treceMesto[0].rank, treceMesto[1].rank, treceMesto[0].forma, treceMesto[1].forma )

//FINALE
console.log('')
console.log('Finale: ')
const finalnaUtakmica = igra(finale[0].tim, finale[1].tim, finale[0].rank, finale[1].rank, finale[0].forma, finale[1].forma )

console.log('')
console.log(

    `Medalje:

     zlato: ${finalnaUtakmica.pobednik}
     srebro: ${finalnaUtakmica.porazeni}
     bronza: ${trece.pobednik}
    `
)