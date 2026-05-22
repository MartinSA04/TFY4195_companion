/* ===================================================================
   TFY4195 Optikk — interaktiv pensumguide
   Innhold bygget fra pensumliste, formelark og eksamenssett (2018–2025)
   =================================================================== */

/* ---------- små byggesteiner for HTML ---------- */
const goals = (items)=>`<div class="card goals"><h3><span class="dot"></span>Læringsmål</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
const formulas = (rows)=>`<div class="formula-box">${rows.map(r=>`<div class="formula-row"><span class="fx">${r[0]}</span><span class="desc">${r[1]}</span></div>`).join('')}</div>`;
const exam = (tags, body)=>`<div class="card exam"><h3><span class="dot"></span>Slik testes dette på eksamen</h3><div class="tagrow">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>${body}</div>`;
const reveal = (label, html)=>`<details class="reveal"><summary>${label||'Vis løsning'}</summary>${html}</details>`;

/* quiz-bygger: spørsmål med alternativer (riktig markert), forklaring */
let QID=0;
function quizCard(title, questions){
  const qs = questions.map(q=>{
    const qid='q'+(QID++);
    const opts = q.opts.map((o,i)=>`<button class="opt" data-qid="${qid}" data-correct="${i===q.answer}">${o}<span class="mark"></span></button>`).join('');
    return `<div class="q"><div class="qtext"><span class="qn">${q.n||''}</span>${q.q}</div>${opts}<div class="explain" id="${qid}-ex">${q.ex||''}</div></div>`;
  }).join('');
  return `<div class="card quiz"><h3><span class="dot"></span>${title||'Sjekk deg selv'}</h3>${qs}</div>`;
}

/* ============================ MODULER ============================ */
const M = [];

/* ---- 0. Foton & radiometri ---- */
M.push({
  id:'foton', num:'00', kicker:'Introduksjon', title:'Foton, bølger & radiometri', week:'Uke 2 · PP Kap. 1',
  html:
  goals([
    'Beskrive lysets dobbeltnatur og fotonets egenskaper (hvilemasse, statistikk, spinn).',
    'Regne foton-energi, -impuls og bølgelengde fram og tilbake mellom <em>E, p, λ, f</em>.',
    'Forstå radiometriske grunnbegreper: strålingsenergi, irradians og romvinkel.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Lys oppfører seg både som en bølge og som en strøm av kvantepartikler – fotoner. Hele faget veksler mellom disse to beskrivelsene; geometrisk optikk og bølgeoptikk er to grenser av samme fysikk.</p>
     <h4>Fotonet</h4>
     <ul>
       <li><strong>Null hvilemasse</strong>, beveger seg alltid med <em>c</em> i vakuum.</li>
       <li>Adlyder <strong>Bose–Einstein-statistikk</strong> (er en boson) – <em>ikke</em> Fermi–Dirac. Dette er et klassisk MC-spørsmål.</li>
       <li>Energien leveres <strong>kvantisert</strong> i pakker $E=hf$.</li>
       <li>Bærer <strong>impuls</strong> $p=E/c$ og <strong>dreieimpuls</strong> (spinn ±ħ, knyttet til sirkulær polarisering).</li>
     </ul>
     <h4>Radiometri</h4>
     <p>Radiometriske størrelser måler strålingseffekt objektivt (i watt), i motsetning til fotometri som vekter etter øyets følsomhet. <strong>Irradians</strong> $E_e$ er effekt per areal $[\\text{W/m}^2]$ inn på en flate; <strong>radians</strong> er effekt per areal per <strong>romvinkel</strong>. Romvinkelen $\\Omega = A/r^2$ måles i steradianer; en hel kule er $4\\pi\\,\\text{sr}$.</p>
     </div>`
  + formulas([
      ['$E=hf=\\dfrac{hc}{\\lambda}$','Foton-energi fra frekvens / bølgelengde. <b>h</b> = Plancks konstant.'],
      ['$p=\\dfrac{E}{c}=\\dfrac{h}{\\lambda}$','Foton-impuls.'],
      ['$\\lambda f = c,\\quad v=\\dfrac{pc^2}{E}=c$','Fart i vakuum.'],
      ['$\\Omega = \\dfrac{A}{r^2}$','Romvinkel i steradianer.']
    ])
  + exam(['Foton-energi fra spektrum','Egenskaper (MC)','Enhetsregning'],
      `<p>Et veldig vanlig oppgave-par: du får et spektrum (f.eks. en blå LED fra ThorLabs) og skal finne <strong>foton-energien</strong> ved toppbølgelengden, ofte som forberedelse til et koherens-spørsmål. MC-spørsmål spør hvilken egenskap som <em>ikke</em> hører til fotonet (fellen er Fermi–Dirac).</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">En LED har toppbølgelengde $\\lambda \\approx 465\\text{ nm}$. Hva er foton-energien (i eV)?</div>
     <div class="step"><span class="lbl">Formel</span><p>$E=\\dfrac{hc}{\\lambda}$. Praktisk: $hc = 1240\\text{ eV·nm}$.</p></div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Innsetting</span><p>$E=\\dfrac{1240\\text{ eV·nm}}{465\\text{ nm}} \\approx 2{,}67\\text{ eV}$.</p></div>
        <div class="step"><p>Sjekk i joule: $E=\\dfrac{(6{,}63\\times10^{-34})(3{,}0\\times10^{8})}{465\\times10^{-9}}\\approx 4{,}3\\times10^{-19}\\text{ J}$, og $4{,}3\\times10^{-19}/1{,}6\\times10^{-19}\\approx 2{,}7\\text{ eV}$. ✓</p></div>
        <span class="answer">E ≈ 2,67 eV</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Hvilken egenskap hører <em>ikke</em> til fotonet?',
       opts:['Null hvilemasse','Adlyder Fermi–Dirac-statistikk','Kvantisert energilevering','Bærer dreieimpuls'],
       answer:1, ex:'Fotoner er bosoner og adlyder Bose–Einstein-statistikk. Fermi–Dirac gjelder fermioner (f.eks. elektroner).'},
      {n:'2', q:'En kilde dobler bølgelengden. Foton-energien …',
       opts:['dobles','halveres','er uendret','firedobles'],
       answer:1, ex:'$E=hc/\\lambda$ — energi er omvendt proporsjonal med bølgelengde, så dobbel λ gir halv energi.'}
    ])
});

/* ---- 1. Geometrisk optikk I ---- */
M.push({
  id:'geo1', num:'01', kicker:'Geometrisk optikk I', title:'Avbildning, Snell, Fermat & tynne linser', week:'Uke 3 · PP Kap. 2',
  html:
  goals([
    'Bruke <strong>Fermats</strong> og <strong>Huygens</strong> prinsipp til å forklare brytning og refleksjon.',
    'Anvende <strong>Snells lov</strong> og refleksjonsloven, inkl. total intern refleksjon.',
    'Mestre <strong>tynnlinse-likningen</strong>, <strong>linsemakerformelen</strong> og <strong>lateral forstørrelse</strong> med riktig fortegnskonvensjon.',
    'Avgjøre om et bilde er reelt/virtuelt, opprett/invertert, forstørret/forminsket.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Geometrisk optikk modellerer lys som rette stråler. Alt følger av to prinsipper: lys tar den vei som gir <em>stasjonær</em> (oftest minste) optisk veilengde (Fermat), og hvert punkt på en bølgefront er kilde til nye kulebølger (Huygens).</p>
     <h4>Snells lov og refleksjon</h4>
     <p>Ved en flate mellom medier $n_i$ og $n_t$: $n_i\\sin\\theta_i = n_t\\sin\\theta_t$. Refleksjonsvinkel = innfallsvinkel. Begge følger direkte av Fermat.</p>
     <h4>Fortegnskonvensjon (Pedrotti) — kritisk!</h4>
     <ul>
       <li>Lys går venstre → høyre. Objekt-avstand $s_o>0$ til venstre for linsen.</li>
       <li>Bilde-avstand $s_i>0$ (reelt) til høyre; $s_i<0$ (virtuelt) til venstre.</li>
       <li>$R>0$ hvis krumningssenteret ligger til høyre for flaten.</li>
       <li>$f>0$ for konvergerende (positiv) linse.</li>
     </ul>
     <h4>Linsemakerformelen</h4>
     <p>Forteller hvilken brennvidde en linseform gir. En <strong>positiv</strong> (samlende) linse i luft er tykkere på midten; én konveks side mot objektet gir $R_1>0,\\ R_2<0$.</p>
     </div>`
  + formulas([
      ['$n_i\\sin\\theta_i=n_t\\sin\\theta_t$','Snells lov.'],
      ['$\\dfrac{1}{s_o}+\\dfrac{1}{s_i}=\\dfrac{1}{f}$','Tynnlinse-/avbildningslikningen.'],
      ['$m=-\\dfrac{s_i}{s_o}$','Lateral forstørrelse. <b>m<0</b> = invertert.'],
      ['$\\dfrac{1}{f}=\\dfrac{n_2-n_1}{n_1}\\!\\left(\\dfrac{1}{R_1}-\\dfrac{1}{R_2}\\right)$','Linsemakerformelen (linse $n_2$ i medium $n_1$).'],
      ['$f=\\mp\\dfrac{R}{2}$','Sfærisk speil (konkavt $f>0$).']
    ])
  + exam(['Linsemaker-design (MC)','Bildeplassering','Reelt/virtuelt + m','Speil'],
      `<p>Klassiker «Lensmaker F»: gitt $f$ og $n$, hvilken av flere linsegeometrier (verdier av $R_1, R_2$) gir en positiv linse med riktig brennvidde? Du må sette inn fortegn riktig. Andre oppgaver gir objektavstand og ber om bildeplassering, forstørrelse og bildetype.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel — linsemaker</h3>
     <div class="prob">En tynn linse i luft skal ha $f=12{,}0$ cm av et materiale med $n=1{,}40$. En plan-konveks linse har den buede siden mot objektet med $|R|=4{,}8$ cm og flat bakside. Stemmer det?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Fortegn</span><p>Konveks framside: $R_1=+4{,}8$ cm. Flat bakside: $R_2=\\infty \\Rightarrow 1/R_2=0$.</p></div>
        <div class="step"><span class="lbl">Innsetting</span><p>$\\dfrac1f=(1{,}40-1)\\left(\\dfrac{1}{4{,}8}-0\\right)=0{,}40\\cdot 0{,}2083=0{,}0833\\,\\text{cm}^{-1}$.</p></div>
        <div class="step"><p>$f = 1/0{,}0833 = 12{,}0$ cm. ✓</p></div>
        <span class="answer">f = 12,0 cm — gyldig positiv linse</span>`)}
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Interaktivt: tynnlinse-avbildning</h3>
     <p>Dra objektavstanden og brennvidden. Se hvordan bildet flytter seg, og når det skifter fra reelt/invertert til virtuelt/opprett.</p>
     <canvas id="lensCanvas" height="300"></canvas>
     <div class="controls">
       <div class="ctrl"><label>Objektavstand $s_o$ <span class="v" id="soVal"></span></label><input type="range" id="soSlider" min="20" max="320" value="180"></div>
       <div class="ctrl"><label>Brennvidde $f$ <span class="v" id="fVal"></span></label><input type="range" id="fSlider" min="40" max="160" value="90"></div>
     </div>
     <div class="readout" id="lensReadout"></div>
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Et objekt står $2f$ foran en positiv linse. Bildet er …',
       opts:['virtuelt, opprett, forstørret','reelt, invertert, like stort (m=−1) ved $2f$','reelt, opprett ved f','i uendelig'],
       answer:1, ex:'Ved $s_o=2f$ gir likningen $s_i=2f$ og $m=-1$: reelt, invertert, samme størrelse.'},
      {n:'2', q:'For en positiv linse i luft, hvilket fortegnsett gir en gyldig form?',
       opts:['$R_1<0,\\ R_2>0$ (bikonkav)','$R_1>0,\\ R_2<0$ (bikonveks)','begge R negative','R uten betydning'],
       answer:1, ex:'Bikonveks: $R_1>0$ (senter til høyre), $R_2<0$. Da blir $(1/R_1-1/R_2)>0$ og $f>0$.'}
    ])
});

/* ---- 2. Geometrisk optikk II — matriser ---- */
M.push({
  id:'geo2', num:'02', kicker:'Geometrisk optikk II', title:'Stråle-transfer-matriser (ray tracing)', week:'Uke 4 · PP Kap. 18 / 2.8',
  html:
  goals([
    'Sette opp <strong>2×2 stråle-transfer-matriser</strong> for translasjon, brytning og tynne linser.',
    'Multiplisere matriser i <strong>riktig rekkefølge</strong> for å få systemmatrisen.',
    'Tolke elementene og finne forstørrelse og bildetype fra systemmatrisen.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">En stråle beskrives av høyde $y$ og vinkel $\\alpha$ over aksen. Hvert optisk element virker som en lineær transformasjon — en matrise. Et helt system er produktet av matrisene.</p>
     <p>$\\begin{pmatrix} y_2 \\\\ \\alpha_2 \\end{pmatrix} = \\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix}\\begin{pmatrix} y_1 \\\\ \\alpha_1 \\end{pmatrix}$</p>
     <h4>Rekkefølge!</h4>
     <p>Lys treffer elementene i rekkefølge 1, 2, 3 … men matrisen skrives <strong>i motsatt rekkefølge</strong>: $M = M_n \\cdots M_2 M_1$. Det siste elementet lyset møter står lengst til venstre.</p>
     <h4>Tolkning</h4>
     <ul>
       <li><strong>B = 0</strong>: inn- og utplan er konjugerte (objekt/bilde). Da er $A=m$ (lateral forstørrelse).</li>
       <li><strong>C = 0</strong>: teleskopisk/afokalt system (parallelt inn → parallelt ut).</li>
       <li><strong>$\\det M = n_1/n_2$</strong> (=1 om samme medium) — nyttig kontroll.</li>
       <li>$-1/C = f$ for systemets effektive brennvidde.</li>
     </ul>
     </div>`
  + formulas([
      ['$\\begin{pmatrix}1 & d \\\\ 0 & 1\\end{pmatrix}$','Translasjon avstand $d$ (i samme medium).'],
      ['$\\begin{pmatrix}1 & 0 \\\\ -1/f & 1\\end{pmatrix}$','Tynn linse med brennvidde $f$.'],
      ['$\\begin{pmatrix}1 & 0 \\\\ 0 & n_1/n_2\\end{pmatrix}$','Brytning i plan flate.'],
      ['$\\begin{pmatrix}1 & 0 \\\\ \\frac{n_1-n_2}{n_2 R} & n_1/n_2\\end{pmatrix}$','Brytning i sfærisk flate radius $R$.']
    ])
  + exam(['Match system ↔ matrise','Forstørrelse fra A','Virtuelt bilde'],
      `<p>Typisk «Match the optical system with the ray-transfer matrix». Du kjenner igjen elementene fra strukturen: et nullelement i nedre venstre = afokalt; et bestemt $B$ = en translasjon. Andre oppgaver gir en systemmatrise $A$ og ber deg finne forstørrelsen $M$ og om bildet er virtuelt (negativ avstand som gir $M>0$).</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">En tynn linse $f=10$ cm, så fri rom $d=15$ cm til skjermen. Finn systemmatrisen fra linseplan til skjerm, og avgjør om skjermen er i bildeplanet for et fjernt objekt.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Rekkefølge</span><p>Lys: linse → translasjon. Matrise: $M = T\\,L$.</p></div>
        <div class="step"><span class="lbl">Produkt</span><p>$M=\\begin{pmatrix}1&15\\\\0&1\\end{pmatrix}\\begin{pmatrix}1&0\\\\-1/10&1\\end{pmatrix}=\\begin{pmatrix}1-1{,}5&15\\\\-0{,}1&1\\end{pmatrix}=\\begin{pmatrix}-0{,}5&15\\\\-0{,}1&1\\end{pmatrix}$.</p></div>
        <div class="step"><p>Fjernt objekt ⇒ parallelle stråler ($\\alpha_1=0$) fokuserer ved $f=10$ cm, ikke 15 cm. $B\\neq0$, så skjermen er <em>ikke</em> i bildeplanet for uendelig objekt.</p></div>
        <span class="answer">M = [[−0,5, 15],[−0,1, 1]]; fokus ved 10 cm</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'I systemmatrisen betyr elementet $B=0$ at …',
       opts:['systemet er afokalt','inn- og utplan er objekt/bilde-konjugerte','forstørrelsen er 1','strålen er parallell'],
       answer:1, ex:'$B=0$ ⇒ utgangshøyden er uavhengig av inngangsvinkel ⇒ planene er konjugerte (bilde dannes). Da er $A=m$.'},
      {n:'2', q:'Et system består av element 1 (først), så 2, så 3. Systemmatrisen er …',
       opts:['$M_1M_2M_3$','$M_3M_2M_1$','$M_2M_1M_3$','rekkefølge spiller ingen rolle'],
       answer:1, ex:'Elementet lyset møter sist står lengst til venstre: $M=M_3M_2M_1$.'}
    ])
});

/* === fortsettelse: moduler 3+ === */

/* ---- 3. Geometrisk optikk III — instrumenter ---- */
M.push({
  id:'geo3', num:'03', kicker:'Geometrisk optikk III', title:'Lupe, mikroskop, teleskop, kamera & øyet', week:'Uke 5 · PP Kap. 3 / 19',
  html:
  goals([
    'Beregne <strong>vinkelforstørrelse</strong> for lupe, mikroskop og teleskop.',
    'Forstå den <strong>afokale</strong> oppstillingen (to positive linser separert med $f_1+f_2$).',
    'Knytte aperturblender, f-tall og dybdeskarphet til kamera og øyet.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Instrumentene bygges av linsene fra modul 1–2. Nøkkelen er <em>vinkelforstørrelse</em> (MP): hvor mye større vinkel objektet spenner ut på netthinnen sammenlignet med det blotte øye på nærpunktet (25 cm).</p>
     <h4>Afokalt to-linsesystem</h4>
     <p>To positive linser med avstand $d=f_1+f_2$ deler en felles brennpunktsplan. Parallelt lys inn gir parallelt lys ut ($C=0$). Brukes både i teleskop og som mikroskop-prinsipp i øvingene.</p>
     <ul>
       <li><strong>Mikroskop</strong> (objekt nær $f_1$): bildet er <strong>reelt og invertert</strong>, og forstørrelsen er $h_i/h_o=f_2/f_1$.</li>
       <li><strong>Teleskop</strong> (objekt i uendelig): vinkelforstørrelse $MP=-f_o/f_e$ (objektivets brennvidde delt på okularets).</li>
       <li>Endring av avstanden $d$ ødelegger den afokale betingelsen, men for mikroskop-tilfellet over endrer den ikke selve forholdet $f_2/f_1$.</li>
     </ul>
     </div>`
  + formulas([
      ['$MP_\\text{lupe}=\\dfrac{25\\text{ cm}}{f}$','Enkel lupe (bilde i uendelig).'],
      ['$M_\\text{mik}=-\\dfrac{L}{f_o}\\cdot\\dfrac{25}{f_e}$','Sammensatt mikroskop, tubuslengde $L$.'],
      ['$MP_\\text{tel}=-\\dfrac{f_o}{f_e}$','Teleskop (refraktor).'],
      ['$f\\#=\\dfrac{f}{D}$','f-tall: brennvidde / aperturdiameter.']
    ])
  + exam(['Mikroskop: reelt/invertert + m','Teleskop-MP','Øyets optikk'],
      `<p>En gjenganger: «to positive linser i avstand $f_1+f_2$ – er bildet reelt eller virtuelt, opprett eller invertert, hva er forstørrelsen, og endrer avstanden noe?» Riktig svar er typisk <em>reelt, invertert, $h_i/h_o=f_2/f_1$</em>. Tegneoppgaver (på papir) ber om full strålegang gjennom mikroskop/teleskop.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">To positive linser, $f_1=4$ cm og $f_2=5$ cm, settes i avstand $f_1+f_2=9$ cm. Objektet står i brennplanet til linse 1. Bildetype og forstørrelse?</div>
     ${reveal('Vis løsning',
       `<div class="step"><p>Linse 1 lager parallelt lys (objekt i $f_1$). Linse 2 fokuserer dette i sitt brennplan ⇒ reelt bilde til høyre.</p></div>
        <div class="step"><p>Systemet inverterer bildet én gang ⇒ <strong>invertert</strong>. Vinkelforstørrelse $=f_2/f_1=5/4=1{,}25$.</p></div>
        <span class="answer">Reelt, invertert, m = f₂/f₁ = 1,25</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Du bygger «mikroskop» av to positive linser i avstand $f_1+f_2$. Bildet er:',
       opts:['virtuelt og opprett','reelt og invertert, $h_i/h_o=f_2/f_1$','reelt og opprett','i uendelig'],
       answer:1, ex:'Afokal oppstilling med objekt nær $f_1$: reelt, invertert bilde i brennplanet til linse 2, forstørrelse $f_2/f_1$.'},
      {n:'2', q:'Et teleskop har $f_o=100$ cm, $f_e=2$ cm. Vinkelforstørrelsen er omtrent:',
       opts:['×2','×50','×200','×0,02'],
       answer:1, ex:'$MP=-f_o/f_e=-100/2=-50$. Størrelse 50×, invertert.'}
    ])
});

/* ---- 4. Bølgeoptikk I — Maxwell & EM-bølger ---- */
M.push({
  id:'wave1', num:'04', kicker:'Bølgeoptikk I', title:'Maxwells likninger & EM-bølger', week:'Uke 6 · PP Kap. 4',
  html:
  goals([
    'Kjenne Maxwells likninger i vakuum og i transparente medier (uten ladning/strøm).',
    'Utlede og bruke <strong>bølgelikningen</strong> og plan-bølge-løsningen.',
    'Forstå transversaliteten $E\\perp B\\perp k$ og bruke <strong>Poynting-vektoren</strong> for intensitet.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Lys er en elektromagnetisk bølge. Maxwells fire likninger kombineres til en bølgelikning der lyshastigheten i et medium er $v=c/n$. Detaljene i utledningen er ikke pensum, men du må kjenne strukturen og de viktige grunnleggerne (Maxwell, Faraday, Hertz).</p>
     <h4>Plan-bølge-løsningen</h4>
     <p>$\\vec E = \\vec E_0\\cos(\\vec k\\cdot\\vec r-\\omega t)$ løser bølgelikningen når $\\omega=kv$. Her er $k=2\\pi/\\lambda$ bølgetallet og $\\omega=2\\pi f$ vinkelfrekvensen.</p>
     <h4>Geometri (ofte spurt om)</h4>
     <ul>
       <li>$\\vec E$, $\\vec B$ og utbredelsesretningen $\\vec k$ er <strong>innbyrdes vinkelrette</strong>, og $\\vec E\\times\\vec B$ peker langs $\\vec k$.</li>
       <li>Amplitudene henger sammen: $|\\vec B| = |\\vec E|/v$ (i vakuum $B_0=E_0/c$).</li>
       <li>Bølgelengden leses rett av fra $k$: $\\lambda = 2\\pi/k$.</li>
     </ul>
     </div>`
  + formulas([
      ['$\\nabla^2\\vec E=\\dfrac{n^2}{c^2}\\dfrac{\\partial^2\\vec E}{\\partial t^2}$','Bølgelikningen for EM-felt.'],
      ['$\\vec E=\\vec E_0\\cos(\\vec k\\cdot\\vec r-\\omega t)$','Plan-bølge, med $\\omega=kv,\\ k=2\\pi/\\lambda$.'],
      ['$B_0=E_0/v$','Forhold mellom amplitudene.'],
      ['$\\vec S=c^2\\varepsilon_0(\\vec E\\times\\vec B)$','Poynting-vektor (energifluks).'],
      ['$I=\\langle S\\rangle=\\tfrac12 c\\,n\\,\\varepsilon_0 E_0^2$','Intensitet (tidsmidlet).']
    ])
  + exam(['Bølgelengde fra k','B-feltets retning/styrke','Intensitet'],
      `<p>«EMwave»-oppgaven gir et uttrykk $\\vec E=E_0\\cos(kz-\\omega t)\\hat x$ og spør om <strong>bølgelengden</strong> ($\\lambda=2\\pi/k$) og <strong>magnetfeltets retning og styrke</strong> (vinkelrett, langs $\\hat y$ slik at $\\hat x\\times\\hat y=\\hat z$, med $B_0=E_0/c$). «Select two alternatives».</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">$\\vec E = 30\\cos(1{,}26\\times10^{7} z - \\omega t)\\,\\hat x$ V/m i vakuum. Finn $\\lambda$ og beskriv $\\vec B$.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Bølgelengde</span><p>$k=1{,}26\\times10^{7}\\,\\text{m}^{-1}\\Rightarrow \\lambda=2\\pi/k\\approx 4{,}99\\times10^{-7}\\text{ m}\\approx 500$ nm.</p></div>
        <div class="step"><span class="lbl">B-felt</span><p>Utbredelse langs $+\\hat z$, $\\vec E$ langs $\\hat x$. For at $\\vec E\\times\\vec B \\parallel \\hat z$ må $\\vec B$ ligge langs $\\hat y$. Amplitude $B_0=E_0/c=30/(3\\times10^8)=1{,}0\\times10^{-7}$ T.</p></div>
        <span class="answer">λ ≈ 500 nm; B langs ŷ, B₀ ≈ 1,0×10⁻⁷ T</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'En plan EM-bølge i vakuum har $\\vec E$ langs $\\hat x$ og utbreder seg langs $+\\hat z$. $\\vec B$ ligger langs:',
       opts:['$\\hat z$','$\\hat x$','$\\hat y$','$-\\hat z$'],
       answer:2, ex:'$\\vec E\\times\\vec B$ må peke langs $+\\hat z$. $\\hat x\\times\\hat y=\\hat z$, så $\\vec B\\parallel\\hat y$.'},
      {n:'2', q:'I et medium med $n=1{,}5$ er lysets fart:',
       opts:['$1{,}5c$','$c$','$c/1{,}5\\approx 2{,}0\\times10^8$ m/s','avhenger av amplituden'],
       answer:2, ex:'$v=c/n=3{,}0\\times10^8/1{,}5=2{,}0\\times10^8$ m/s.'}
    ])
});

/* ---- 5. Bølgeoptikk II — Fresnel, Brewster, polarisering ---- */
M.push({
  id:'wave2', num:'05', kicker:'Bølgeoptikk II', title:'Fresnels likninger, Brewster & polarisering', week:'Uke 7 · PP Kap. 23 / 12',
  html:
  goals([
    'Bruke <strong>Fresnels likninger</strong> for TE- og TM-polarisering ved en flate.',
    'Beregne <strong>reflektans R</strong> og <strong>transmittans T</strong> (energibevaring $R+T=1$).',
    'Finne og forklare <strong>Brewster-vinkelen</strong> og polariseringstilstanden til reflektert lys.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Når lys treffer en flate, deles det i en reflektert og en transmittert del. Hvor mye, og hvilken polarisering, gis av Fresnels likninger. Disse skiller mellom <strong>TE</strong> (s, E vinkelrett innfallsplanet) og <strong>TM</strong> (p, E i innfallsplanet).</p>
     <h4>Brewster-vinkelen</h4>
     <p>Ved $\\theta_p=\\arctan(n_2/n_1)$ er $r_{TM}=0$: TM-komponenten reflekteres ikke. Da er <strong>alt reflektert lys lineært polarisert</strong> (kun TE). Dette er prinsippet bak polariserte solbriller og Brewster-vinduer i lasere.</p>
     <h4>Tolkning av Fresnel-kurvene</h4>
     <ul>
       <li>Ved normal innfall: $R=\\left(\\dfrac{n_1-n_2}{n_1+n_2}\\right)^2$ (≈4 % for glass/luft).</li>
       <li>TM-kurven krysser null ved Brewster; TE øker monotont.</li>
       <li>Internt (fra tett til tynt medium) over kritisk vinkel: $|r|=1$ for begge — total intern refleksjon.</li>
     </ul>
     </div>`
  + formulas([
      ['$r_{TE}=\\dfrac{\\cos\\theta-\\sqrt{n^2-\\sin^2\\theta}}{\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}$','TE-refleksjonskoeff., $n=n_2/n_1$.'],
      ['$r_{TM}=\\dfrac{-n^2\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}{n^2\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}$','TM-refleksjonskoeff.'],
      ['$R=r^2,\\quad T=n\\dfrac{\\cos\\theta_t}{\\cos\\theta}\\,t^2$','Energi-reflektans og -transmittans, $R+T=1$.'],
      ['$\\theta_p=\\arctan\\!\\dfrac{n_2}{n_1}$','Brewster-vinkel (reflektert lys lineært polarisert).']
    ])
  + exam(['«Fate of laser» (MC)','Brewster','Polarisering ved refleksjon','TIR'],
      `<p>«FresnelC»: en 45°-polarisert (lik TE/TM) stråle treffer en flate på en gitt vinkel — hva skjer? Du regner Brewster og kritisk vinkel, og sammenligner. Andre oppgaver: hva er polariseringstilstanden til reflektert lys ved Brewster (svar: lineært polarisert, kun TE)? Sirkulærpolarisert lys reflektert ved Brewster blir lineært.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel — Brewster</h3>
     <div class="prob">Lys går fra luft ($n_1=1{,}0$) mot glass ($n_2=1{,}52$). Hva er Brewster-vinkelen, og hva skjer med 45°-polarisert lys ved denne vinkelen?</div>
     ${reveal('Vis løsning',
       `<div class="step"><p>$\\theta_p=\\arctan(1{,}52/1{,}0)=\\arctan(1{,}52)\\approx 56{,}7^\\circ$.</p></div>
        <div class="step"><p>Ved $\\theta_p$ er $r_{TM}=0$. Den reflekterte strålen inneholder bare TE-komponenten ⇒ <strong>fullstendig lineært polarisert</strong> (vinkelrett innfallsplanet). TM-delen transmitteres fullt.</p></div>
        <span class="answer">θ_p ≈ 56,7°; reflektert lys er lineært polarisert (TE)</span>`)}
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Interaktivt: Fresnel-reflektans vs. vinkel</h3>
     <p>Endre forholdet $n_2/n_1$. Se Brewster-vinkelen (TM→0) og — ved internt forhold &lt;1 — den kritiske vinkelen der begge går til 1.</p>
     <canvas id="fresnelCanvas" height="300"></canvas>
     <div class="controls">
       <div class="ctrl"><label>$n_1$ (innfallsmedium) <span class="v" id="n1Val"></span></label><input type="range" id="n1Slider" min="100" max="200" value="100"></div>
       <div class="ctrl"><label>$n_2$ (transmisjonsmedium) <span class="v" id="n2Val"></span></label><input type="range" id="n2Slider" min="100" max="250" value="152"></div>
     </div>
     <div class="readout" id="fresnelReadout"></div>
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Uppolarisert lys treffer glass ved Brewster-vinkelen. Det reflekterte lyset er:',
       opts:['uppolarisert','fullstendig lineært polarisert','sirkulært polarisert','ikke-eksisterende'],
       answer:1, ex:'Ved Brewster er $r_{TM}=0$, så bare TE-komponenten reflekteres ⇒ lineært polarisert.'},
      {n:'2', q:'Ved normal innfall luft→glass ($n=1{,}5$) er reflektansen omtrent:',
       opts:['0 %','4 %','25 %','50 %'],
       answer:1, ex:'$R=((1-1{,}5)/(1+1{,}5))^2=(0{,}2)^2=0{,}04=4\\%$.'}
    ])
});

/* ---- 6. Bølgeoptikk III — TIR, evanescente bølger, regnbue ---- */
M.push({
  id:'wave3', num:'06', kicker:'Bølgeoptikk III', title:'Total intern refleksjon, evanescente bølger & regnbuen', week:'Uke 8/12 · PP Kap. 23 / 10',
  html:
  goals([
    'Beregne <strong>kritisk vinkel</strong> og forstå total intern refleksjon (TIR).',
    'Beskrive <strong>evanescente bølger</strong> og anvendelser (TIR-mikroskopi, bølgeledere).',
    'Forklare <strong>regnbuen</strong> kvantitativt (primær ~42°, sekundær ~51°, dispersjon).'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Når lys forsøker å gå fra et tett til et tynt medium ved stor vinkel, reflekteres alt internt. Men feltet «lekker» en kort avstand inn i det tynne mediet som en evanescent bølge — grunnlaget for fiberoptikk og nær-felt-mikroskopi.</p>
     <h4>Kritisk vinkel</h4>
     <p>$\\sin\\theta_c=n_2/n_1$ (fra tett $n_1$ til tynt $n_2$). For $\\theta>\\theta_c$: TIR, og $r_{TE},r_{TM}$ blir komplekse med $|r|=1$ — full refleksjon, men med faseforskyvning (Goos–Hänchen).</p>
     <h4>Evanescent bølge</h4>
     <p>Amplituden avtar eksponentielt: $E\\propto e^{-z/d}$, der inntrengningsdybden $d\\sim\\lambda$. Ingen netto energi transporteres bort (ved isolert flate).</p>
     <h4>Regnbuen</h4>
     <p>Primærbuen: én indre refleksjon i vanndråpen, minimum avbøyning ≈ <strong>42°</strong> (rødt ytterst). Sekundærbuen: to refleksjoner, ≈ <strong>51°</strong>, fargene snudd, og mørkt bånd (Alexanders) imellom. Dispersjonen i $n(\\lambda)$ skiller fargene.</p>
     </div>`
  + formulas([
      ['$\\sin\\theta_c=\\dfrac{n_2}{n_1}$','Kritisk vinkel (tett→tynt, $n_1>n_2$).'],
      ['$|r|=1$ for $\\theta>\\theta_c$','Total intern refleksjon, kompleks $r$ (faseforskyvning).'],
      ['$E(z)\\propto e^{-z/d}$','Evanescent bølge, eksponentielt avtagende.'],
      ['$\\theta_\\text{regn}\\approx 42^\\circ\\,(1°),\\,51^\\circ\\,(2°)$','Primær- og sekundærbue.']
    ])
  + exam(['Strålegang i prisme','TIR-betingelse','Sirkulær polarisering etter TIR'],
      `<p>Prisme-oppgaver («$n\\approx1{,}5$ i luft — hvilken strålegang er mulig?») tester om TIR inntreffer på innsiden. Polariseringsoppgaver: venstre-sirkulært lys som treffer en indre flate over kritisk vinkel får en relativ faseforskyvning mellom TE og TM ⇒ blir generelt elliptisk/endret håndethet — i motsetning til ved en vanlig refleksjon under Brewster der det blir lineært.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">Glass $n=1{,}50$ i luft. Hva er kritisk vinkel, og vil en stråle som treffer den indre flaten med 45° gjennomgå TIR?</div>
     ${reveal('Vis løsning',
       `<div class="step"><p>$\\sin\\theta_c=1{,}00/1{,}50=0{,}667\\Rightarrow\\theta_c=41{,}8^\\circ$.</p></div>
        <div class="step"><p>$45^\\circ>41{,}8^\\circ$ ⇒ <strong>ja, total intern refleksjon</strong>. Derfor brukes 45°-prismer som speil i kikkerter.</p></div>
        <span class="answer">θ_c = 41,8°; 45° gir TIR</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'For total intern refleksjon må lyset gå …',
       opts:['fra tynt til tett medium','fra tett til tynt medium, over kritisk vinkel','ved normal innfall','aldri – det finnes ikke'],
       answer:1, ex:'TIR krever $n_1>n_2$ og $\\theta>\\theta_c$ der $\\sin\\theta_c=n_2/n_1$.'},
      {n:'2', q:'Primærregnbuen sees i en vinkel på omtrent:',
       opts:['10°','42°','90°','180°'],
       answer:1, ex:'Minimum avbøyning for én indre refleksjon gir ≈42° (rødt ytterst).'}
    ])
});

/* ---- 7. Bølgeoptikk IV — superposisjon & Youngs dobbeltspalt ---- */
M.push({
  id:'wave4', num:'07', kicker:'Bølgeoptikk IV', title:'Superposisjon & Youngs dobbeltspalt', week:'Uke 8 · PP Kap. 5–7',
  html:
  goals([
    'Legge sammen bølger med <strong>fasoraddisjon</strong> og finne resulterende amplitude og fase.',
    'Utlede og bruke <strong>Youngs</strong> interferensmønster og stripeavstand.',
    'Beregne effekten av en innskutt glassplate (stripeforskyvning).'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">To koherente bølger som møtes legger seg sammen. Resultatet avhenger av faseforskjellen: i fase ⇒ konstruktiv (lyst), i motfase ⇒ destruktiv (mørkt). Youngs dobbeltspalt er det rene skoleeksemplet.</p>
     <h4>Fasoraddisjon</h4>
     <p>For to felt med amplituder $E_{01},E_{02}$ og faser $\\alpha_1,\\alpha_2$ blir resulterende amplitude $E_0^2=E_{01}^2+E_{02}^2+2E_{01}E_{02}\\cos(\\alpha_2-\\alpha_1)$. Kryssleddet er interferensen.</p>
     <h4>Youngs dobbeltspalt</h4>
     <p>To spalter med avstand $a$, lys $\\lambda$, skjerm i avstand $L$. Veiforskjellen til vinkel $\\theta$ er $a\\sin\\theta$. Maksima når $a\\sin\\theta=m\\lambda$. Stripene er jevnt fordelt med avstand $\\Delta y=\\lambda L/a$.</p>
     <p>Skyver du en glassplate (tykkelse $t$, indeks $n$) foran én spalt, øker den optiske veilengden med $(n-1)t$, og mønsteret forskyves med antall striper $N=(n-1)t/\\lambda$.</p>
     </div>`
  + formulas([
      ['$E_0^2=E_{01}^2+E_{02}^2+2E_{01}E_{02}\\cos(\\alpha_2-\\alpha_1)$','Resulterende amplitude (fasoraddisjon).'],
      ['$I_\\text{tot}=4I_0\\cos^2\\!\\big(\\tfrac{\\pi a\\sin\\theta}{\\lambda}\\big)$','Youngs intensitetsmønster.'],
      ['$\\Delta y=\\dfrac{\\lambda L}{a}$','Stripeavstand på skjermen.'],
      ['$N=\\dfrac{(n-1)t}{\\lambda}$','Stripeforskyvning fra glassplate over én spalt.']
    ])
  + exam(['Fasoraddisjon (regn)','Stripeavstand','Glassplate-forskyvning','Veiforskjell ↔ halv-maks'],
      `<p>Tre-i-ett-oppgave: (i) finn skjermavstanden $L$ for ønsket $\\Delta y$ (bruk $\\Delta y=\\lambda L/a$); (ii) hvor mange striper forskyves mønsteret av en glassplate; (iii) hvilken veiforskjell tilsvarer skiftet fra topp-maks til halv-maks (svar: $\\lambda/4$ i veiforskjell, dvs. $\\Delta=\\lambda/4$ … kontroller fra $\\cos^2$).</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">Spaltavstand $a=0{,}5$ mm, $\\lambda=600$ nm. (i) Hvilken $L$ gir stripeavstand 1 mm? (ii) En glassplate $n=1{,}502$, $t=100\\,\\mu$m over én spalt — hvor mange striper forskyves?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">(i)</span><p>$L=\\dfrac{a\\,\\Delta y}{\\lambda}=\\dfrac{(0{,}5\\times10^{-3})(1\\times10^{-3})}{600\\times10^{-9}}=0{,}833$ m.</p></div>
        <div class="step"><span class="lbl">(ii)</span><p>$N=\\dfrac{(n-1)t}{\\lambda}=\\dfrac{(0{,}502)(100\\times10^{-6})}{600\\times10^{-9}}=83{,}7\\approx 83{,}3$ striper.</p></div>
        <span class="answer">L = 0,833 m; ≈ 83 striper</span>`)}
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Interaktivt: Youngs interferensmønster</h3>
     <p>Endre spaltavstand og bølgelengde, og se hvordan stripene trekkes sammen eller spres.</p>
     <canvas id="youngCanvas" height="220"></canvas>
     <div class="controls">
       <div class="ctrl"><label>Spaltavstand $a$ <span class="v" id="aVal"></span></label><input type="range" id="aSlider" min="20" max="200" value="80"></div>
       <div class="ctrl"><label>Bølgelengde $\\lambda$ <span class="v" id="lamVal"></span></label><input type="range" id="lamSlider" min="400" max="700" value="550"></div>
     </div>
     <div class="readout" id="youngReadout"></div>
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Hvis du dobler spaltavstanden $a$ i et Young-oppsett, blir stripeavstanden:',
       opts:['dobbelt så stor','halvparten','uendret','firedobbel'],
       answer:1, ex:'$\\Delta y=\\lambda L/a$ — omvendt proporsjonal med $a$. Større $a$ ⇒ tettere striper.'},
      {n:'2', q:'To koherente bølger med lik amplitude $E_0$ i motfase ($\\Delta\\alpha=\\pi$) gir resulterende intensitet:',
       opts:['$4I_0$','$2I_0$','$I_0$','0'],
       answer:3, ex:'$\\cos\\pi=-1$ ⇒ $E_0^2=E_0^2+E_0^2-2E_0^2=0$. Fullstendig destruktiv.'}
    ])
});


/* ---- 8. Bølgeoptikk V — koherens, Michelson, tynne filmer ---- */
M.push({
  id:'wave5', num:'08', kicker:'Bølgeoptikk V', title:'Koherens, Michelson-interferometer & tynne filmer', week:'Uke 11 · PP Kap. 9',
  html:
  goals([
    'Skille <strong>temporal</strong> og <strong>spatial</strong> koherens og beregne koherenslengder.',
    'Analysere <strong>Michelson-interferometeret</strong> og bruke <strong>synlighet (visibility)</strong>.',
    'Beregne <strong>tynnfilm-interferens</strong> og designe antirefleksbelegg.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Interferens krever koherens. Temporal koherens (langs strålen) settes av spektralbredden; spatial koherens (på tvers) av kildens utstrekning. En LED har kort koherenslengde, en laser lang.</p>
     <h4>Koherenslengder</h4>
     <p><strong>Temporal:</strong> $l_c=\\dfrac{\\lambda_0^2}{\\Delta\\lambda}=\\dfrac{c}{\\Delta f}$. Smalt spektrum ⇒ lang koherens. <strong>Spatial:</strong> $l_s<\\dfrac{1{,}22\\lambda}{\\theta}$ for en kilde som spenner vinkelen $\\theta$.</p>
     <h4>Michelson</h4>
     <p>Stråledeler sender lys mot to speil; ved rekombinasjon: $I=4I_0\\cos^2(\\delta/2)$ med $\\delta=\\frac{2\\pi}{\\lambda}\\Delta p$ og veiforskjell $\\Delta p=2d\\cos\\theta$. Flytter du ett speil $\\Delta d$, teller du $\\Delta m=2\\Delta d/\\lambda$ striper.</p>
     <h4>Tynne filmer</h4>
     <p>Optisk veiforskjell $\\Delta=2n_f t\\cos\\theta_t$. Husk evt. ekstra $\\lambda/2$ ($\\Delta_r$) fra refleksjon ved hardere medium. <strong>Antirefleks</strong>: destruktiv refleksjon ⇒ $2n_f t=\\lambda/2$ (kvartbølgelag) ved normal innfall.</p>
     </div>`
  + formulas([
      ['$l_c=\\dfrac{\\lambda_0^2}{\\Delta\\lambda}=\\dfrac{c}{\\Delta f}$','Temporal koherenslengde.'],
      ['$l_s<\\dfrac{1{,}22\\lambda}{\\theta}$','Spatial koherenslengde (sirkulær apertur).'],
      ['$I=4I_0\\cos^2(\\delta/2),\\ \\Delta p=2d\\cos\\theta$','Michelson-interferometer.'],
      ['$V=\\dfrac{I_\\text{max}-I_\\text{min}}{I_\\text{max}+I_\\text{min}}$','Synlighet (visibility).'],
      ['$\\Delta=2n_f t\\cos\\theta_t$','Tynnfilm: optisk veiforskjell.']
    ])
  + exam(['Koherenslengde fra spektrum','AR-belegg ved vinkel','Michelson-skift','Fabry–Perot vs Michelson'],
      `<p>«coherencelengthA/B»: finn først foton-energi, deretter koherenslengde fra spektralbredden via $l_c=c/\\Delta f$. Tynnfilm-klassiker: et MgF₂-lag ($n=1{,}38$) er antirefleks ved 580 nm normalt innfall — hvilken bølgelengde slukkes minimalt ved 45°? (Bruk $\\cos\\theta_t$ via Snell.) Fabry–Perot: høy $r$ ⇒ skarpe striper ⇒ høyere oppløsning.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel — AR-belegg ved vinkel</h3>
     <div class="prob">MgF₂ ($n_f=1{,}38$) på glass er antirefleks ved 580 nm ved normal innfall. Hvilken bølgelengde slukkes minimalt ved 45° innfall?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Tykkelse</span><p>Normalt: $2n_f t=\\lambda/2\\Rightarrow t=\\dfrac{580}{4\\cdot1{,}38}=105{,}1$ nm.</p></div>
        <div class="step"><span class="lbl">Vinkel i film</span><p>Snell: $\\sin\\theta_t=\\sin45^\\circ/1{,}38=0{,}512\\Rightarrow\\theta_t=30{,}8^\\circ,\\ \\cos\\theta_t=0{,}859$.</p></div>
        <div class="step"><span class="lbl">Ny bølgelengde</span><p>$\\lambda'=4n_f t\\cos\\theta_t=4(1{,}38)(105{,}1)(0{,}859)\\approx 498$ nm.</p></div>
        <span class="answer">λ′ ≈ 498 nm</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'En kilde med smalere spektralbredde $\\Delta\\lambda$ har …',
       opts:['kortere koherenslengde','lengre koherenslengde','samme koherenslengde','ingen koherens'],
       answer:1, ex:'$l_c=\\lambda_0^2/\\Delta\\lambda$ — mindre $\\Delta\\lambda$ gir lengre $l_c$. Lasere er svært monokromatiske.'},
      {n:'2', q:'I et Fabry–Perot gir høy speilrefleksjon ($r=0{,}9$) …',
       opts:['lav oppløsning, brede striper','høy oppløsning, skarpe striper','ingen interferens','samme som Michelson'],
       answer:1, ex:'Høy $r$ ⇒ mange runder ⇒ skarpe, smale striper ⇒ høy spektral oppløsning.'}
    ])
});

/* ---- 9. Bølgeoptikk VI — optiske fibre ---- */
M.push({
  id:'wave6', num:'09', kicker:'Bølgeoptikk VI', title:'Optiske fibre & kommunikasjon', week:'Påske-selvstudium · PP Kap. 13',
  html:
  goals([
    'Forklare lysføring i fiber via total intern refleksjon.',
    'Beregne <strong>numerisk apertur</strong> og akseptansevinkel.',
    'Kjenne dispersjon (modal/material) som begrenser båndbredde.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">En optisk fiber er en kjerne ($n_1$) omgitt av et kappemateriale ($n_2<n_1$). Lys som treffer kjerne–kappe-grensen over kritisk vinkel føres ved gjentatt total intern refleksjon — ryggraden i moderne kommunikasjon.</p>
     <h4>Akseptanse og numerisk apertur</h4>
     <p>Bare lys innenfor en akseptanse-kjegle fanges. Numerisk apertur $NA=\\sin\\theta_\\text{max}=\\sqrt{n_1^2-n_2^2}$. Stor $NA$ ⇒ lett å koble inn lys, men flere moder.</p>
     <h4>Dispersjon</h4>
     <ul>
       <li><strong>Modal dispersjon</strong>: ulike stråleveier (moder) har ulik gangtid ⇒ pulser smøres ut. Reduseres i singel-modus-fiber.</li>
       <li><strong>Materialdispersjon</strong>: $n(\\lambda)$ varierer ⇒ ulike bølgelengder reiser ulikt fort.</li>
       <li>Dispersjon begrenser hvor høy bitrate fiberen tåler over en gitt lengde.</li>
     </ul>
     </div>`
  + formulas([
      ['$NA=\\sqrt{n_1^2-n_2^2}$','Numerisk apertur.'],
      ['$\\theta_\\text{max}=\\arcsin(NA/n_0)$','Akseptansevinkel (fra medium $n_0$, ofte luft).'],
      ['$\\sin\\theta_c=n_2/n_1$','Kritisk vinkel ved kjerne–kappe.']
    ])
  + exam(['Numerisk apertur','Akseptansevinkel','Modetall / dispersjon'],
      `<p>Selvstudium-modul, men dukker opp som regneoppgaver: gitt $n_1,n_2$, finn $NA$ og akseptansevinkelen; eller drøft hvorfor singel-modus-fiber gir høyere båndbredde (mindre modal dispersjon).</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">En fiber har kjerne $n_1=1{,}48$ og kappe $n_2=1{,}46$. Finn numerisk apertur og maksimal akseptansevinkel fra luft.</div>
     ${reveal('Vis løsning',
       `<div class="step"><p>$NA=\\sqrt{1{,}48^2-1{,}46^2}=\\sqrt{2{,}1904-2{,}1316}=\\sqrt{0{,}0588}=0{,}242$.</p></div>
        <div class="step"><p>$\\theta_\\text{max}=\\arcsin(0{,}242)\\approx 14{,}0^\\circ$.</p></div>
        <span class="answer">NA ≈ 0,242; θ_max ≈ 14°</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Lys føres i en fiber takket være:',
       opts:['diffraksjon','total intern refleksjon i kjerne–kappe','brytning ved Brewster','absorpsjon'],
       answer:1, ex:'Kjernen har høyere indeks enn kappen, så TIR holder lyset inne.'},
      {n:'2', q:'Singel-modus-fiber har høyere båndbredde fordi den reduserer:',
       opts:['materialdispersjon','modal dispersjon','numerisk apertur','absorpsjon'],
       answer:1, ex:'Med kun én mode forsvinner forskjellen i gangtid mellom moder ⇒ mindre pulsutsmøring.'}
    ])
});

/* ---- 10. Diffraksjon I — Fraunhofer & oppløsning ---- */
M.push({
  id:'diff1', num:'10', kicker:'Diffraksjon I', title:'Fraunhofer-diffraksjon & oppløsning', week:'Uke 9 · PP Kap. 11 / 10',
  html:
  goals([
    'Bruke enkeltspalt-formelen $I=I_0(\\sin\\beta/\\beta)^2$ og finne minima.',
    'Sjekke <strong>fjernfelt-betingelsen</strong> (Fraunhofer-grensen).',
    'Anvende <strong>Airy-skiven</strong> og <strong>Rayleigh-kriteriet</strong> for oppløsning og stråledivergens.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Når lys passerer en åpning på størrelse med bølgelengden, sprer det seg — diffraksjon. I fjernfeltet (Fraunhofer) er mønsteret Fourier-transformen av åpningen.</p>
     <h4>Enkeltspalt</h4>
     <p>$I=I_0\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2$, $\\beta=\\tfrac12 kb\\sin\\theta=\\dfrac{\\pi b\\sin\\theta}{\\lambda}$. <strong>Minima</strong> ved $b\\sin\\theta=m\\lambda$ ($m=1,2,\\dots$). Sentraltoppen er dobbelt så bred som de øvrige.</p>
     <h4>Fjernfelt-betingelse</h4>
     <p>Gyldig når $L\\gg \\dfrac{(\\text{aperturareal})}{\\lambda}$, dvs. $L\\gg b^2/\\lambda$ for en spalt med bredde $b$. Forholdet $L/L_\\text{min}$ forteller hvor «trygt» i fjernfeltet du er.</p>
     <h4>Sirkulær apertur — Airy</h4>
     <p>Vinkelradius til første mørke ring: $\\Delta\\theta_{1/2}=\\dfrac{1{,}22\\lambda}{D}$. Dette gir <strong>Rayleigh-kriteriet</strong> for oppløsning og bestemmer en stråles diffraksjonsspredning.</p>
     </div>`
  + formulas([
      ['$I=I_0\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2,\\ \\beta=\\dfrac{\\pi b\\sin\\theta}{\\lambda}$','Enkeltspalt-intensitet.'],
      ['$b\\sin\\theta_m=m\\lambda$','Minima for enkeltspalt.'],
      ['$\\Delta\\theta_{1/2}=\\dfrac{1{,}22\\lambda}{D}\\approx\\dfrac{\\Delta x}{L}$','Airy-skive / Rayleigh.'],
      ['$L\\gg\\dfrac{b^2}{\\lambda}$','Fraunhofer (fjernfelt) gyldig.']
    ])
  + exam(['Spaltbredde fra mønster','Fjernfelt-sjekk L/Lₘᵢₙ','Stråledivergens','Aperturdiameter (Airy)'],
      `<p>Klassiker: mål avstanden mellom tredje minima på hver side ⇒ finn spaltbredden $b$ fra $b\\sin\\theta=m\\lambda$, og sjekk så $L/L_\\text{min}$ for å bekrefte fjernfelt. Stråle-oppgave: estimer hvor mye en laserstråle ($b=0{,}5$ mm) brer seg over 10 m. Airy-oppgave: finn ukjent aperturdiameter fra spotstørrelsen på en fjern vegg.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel — spaltbredde</h3>
     <div class="prob">Laser 632,8 nm, skjerm $L=2$ m. Avstand mellom 3. minima på hver side er 5,625 cm. Finn $b$, og sjekk fjernfeltet.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Vinkel</span><p>Halve avstanden til 3. minimum: $x=2{,}8125$ cm ⇒ $\\sin\\theta\\approx \\theta = x/L=0{,}02813/2=0{,}01406$. Med $m=3$:</p></div>
        <div class="step"><span class="lbl">Spaltbredde</span><p>$b=\\dfrac{m\\lambda}{\\sin\\theta}=\\dfrac{3(632{,}8\\times10^{-9})}{0{,}01406}\\approx 1{,}35\\times10^{-4}$ m $=0{,}13$ mm.</p></div>
        <div class="step"><span class="lbl">Fjernfelt</span><p>$L_\\text{min}\\sim b^2/\\lambda=(1{,}35\\times10^{-4})^2/632{,}8\\times10^{-9}\\approx 0{,}029$ m. $L/L_\\text{min}\\approx 2/0{,}029\\approx 70$–$140$ (avhengig av definisjon) ⇒ trygt i fjernfeltet.</p></div>
        <span class="answer">b ≈ 0,13 mm; fjernfelt bekreftet</span>`)}
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Interaktivt: enkelt- og flerspalt-diffraksjon</h3>
     <p>Sett antall spalter $N$, spaltbredde $b$ og avstand $a$. Se hvordan den brede enkeltspalt-konvolutten moduleres av de skarpe flerspalt-toppene.</p>
     <canvas id="diffCanvas" height="240"></canvas>
     <div class="controls">
       <div class="ctrl"><label>Antall spalter $N$ <span class="v" id="NVal"></span></label><input type="range" id="NSlider" min="1" max="8" value="1"></div>
       <div class="ctrl"><label>Spaltbredde $b$ <span class="v" id="bVal"></span></label><input type="range" id="bSlider" min="10" max="60" value="25"></div>
       <div class="ctrl"><label>Spaltavstand $a$ <span class="v" id="aDVal"></span></label><input type="range" id="aDSlider" min="40" max="180" value="100"></div>
     </div>
     <div class="readout" id="diffReadout"></div>
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Hva øker diameteren på Airy-skiven?',
       opts:['kun større $\\lambda$','kun mindre apertur $D$','kun større skjermavstand','alle tre over'],
       answer:3, ex:'$\\Delta x\\approx 1{,}22\\lambda L/D$ — øker med $\\lambda$ og $L$, og med mindre $D$.'},
      {n:'2', q:'En 0,5 mm bred stråle (546 nm) over 10 m brer seg til omtrent:',
       opts:['0,5 mm','≈ 22 mm','≈ 2 m','uendret'],
       answer:1, ex:'Spredning $\\approx 2\\lambda L/b=2(546\\text{e-}9)(10)/(0{,}5\\text{e-}3)\\approx 0{,}022$ m ≈ 22 mm.'}
    ])
});

/* ---- 11. Diffraksjon II — Fourier-optikk & gitter ---- */
M.push({
  id:'diff2', num:'11', kicker:'Diffraksjon II', title:'Fourier-optikk & diffraksjonsgitteret', week:'Uke 10 · PP Kap. 12 / 11',
  html:
  goals([
    'Bruke flerspalt-formelen og <strong>gitterlikningen</strong>.',
    'Beregne et gitters <strong>dispersjon</strong>, <strong>oppløsning</strong> og <strong>frie spektralområde</strong>.',
    'Forstå Fourier-optikk-bildet: fjernfeltmønsteret som transform av åpningen.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">Mange spalter (et gitter) gir skarpe, lyssterke topper — ideelt til å splitte lys i bølgelengder. Fourier-optikken sier at fjernfeltet er Fourier-transformen av åpningsfunksjonen, så «mønster ↔ struktur» blir et transformpar.</p>
     <h4>Flerspalt-intensitet</h4>
     <p>$I=I_0\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2\\left(\\dfrac{\\sin N\\alpha}{\\sin\\alpha}\\right)^2$, med $\\alpha=\\tfrac12 ak\\sin\\theta$ (mellom-spalt) og $\\beta=\\tfrac12 bk\\sin\\theta$ (enkeltspalt). Enkeltspalt-leddet er konvolutten; gitter-leddet gir de skarpe hovedmaksima.</p>
     <h4>Gitterlikningen</h4>
     <p>$m\\lambda=a(\\sin\\theta_i+\\sin\\theta_m)$. Ordenstallet $m$ gir flere spektre. Et gitters kvalitet måles ved oppløsning $\\mathcal R=mN$ (orden × antall opplyste spalter) og dispersjon $\\mathcal D=m/(a\\cos\\theta_m)$.</p>
     </div>`
  + formulas([
      ['$I=I_0\\big(\\tfrac{\\sin\\beta}{\\beta}\\big)^2\\big(\\tfrac{\\sin N\\alpha}{\\sin\\alpha}\\big)^2$','$N$ spalter, bredde $b$, avstand $a$.'],
      ['$m\\lambda=a(\\sin\\theta_i+\\sin\\theta_m)$','Gitterlikningen.'],
      ['$\\mathcal R=\\dfrac{\\lambda}{\\Delta\\lambda}=mN$','Spektral oppløsning.'],
      ['$\\mathcal D=\\dfrac{d\\theta_m}{d\\lambda}=\\dfrac{m}{a\\cos\\theta_m}$','Vinkeldispersjon.'],
      ['$\\lambda_\\text{fsr}=\\dfrac{\\lambda_1}{m}$','Fritt spektralområde.']
    ])
  + exam(['Flerspalt → λ og a','Gitter-oppløsning','Antall hovedmaksima','Dispersjon'],
      `<p>«Multislit»: gitt mønstre for én spalt og for $N=4$ spalter, les av (1) bølgelengden (fra enkeltspalt-konvoluttens minima) og (2) spaltavstanden $a$ (fra de tette hovedmaksima). Gitteroppgaver: hvilken oppløsning kreves for å skille to nære linjer ⇒ bruk $\\mathcal R=mN$.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel — flerspalt</h3>
     <div class="prob">Et gitter med $N=4$ spalter, $a=88{,}6\\,\\mu$m bredde-info ... gitt at hovedmaksima på en 7 m skjerm ligger med avstand $\\Delta x$. Hva er prinsippet for å finne $\\lambda$ og $a$?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">λ fra konvolutten</span><p>Den brede enkeltspalt-konvolutten har minima ved $b\\sin\\theta=\\lambda$. Mål første minimum-vinkel ⇒ $\\lambda=b\\sin\\theta\\approx b\\,(x/L)$.</p></div>
        <div class="step"><span class="lbl">a fra hovedmaksima</span><p>De skarpe gitter-toppene ligger ved $a\\sin\\theta=m\\lambda$. Mål avstanden mellom dem ⇒ $a=\\dfrac{m\\lambda L}{x_m}$.</p></div>
        <div class="step"><p>Mellom to hovedmaksima ligger $N-1=3$ minima og $N-2=2$ sekundærmaksima — en god kontroll på at $N=4$.</p></div>
        <span class="answer">λ fra enkeltspalt-minima; a fra hovedmaksima-avstand</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Et gitter med $N=5000$ spalter brukes i 2. orden. Oppløsningen $\\mathcal R$ er:',
       opts:['5000','10000','2500','50000'],
       answer:1, ex:'$\\mathcal R=mN=2\\times5000=10000$.'},
      {n:'2', q:'Mellom to nabo-hovedmaksima fra et $N$-spaltgitter er det:',
       opts:['$N$ minima','$N-1$ minima','1 minimum','ingen minima'],
       answer:1, ex:'$(\\sin N\\alpha/\\sin\\alpha)^2$ har $N-1$ nullpunkter (minima) og $N-2$ sekundærmaksima mellom hovedmaksima.'}
    ])
});


/* ============================ STUDIEPLAN ============================ */
const PLAN = [
  ['Uke 2','Foton & radiometri','Intro, fotonegenskaper'],
  ['Uke 3','Geometrisk optikk I','Snell, Fermat, tynne linser'],
  ['Uke 4','Geometrisk optikk II','Matrisemetode'],
  ['Uke 5','Geometrisk optikk III','Instrumenter, øyet'],
  ['Uke 6','Bølgeoptikk I','Maxwell, EM-bølger'],
  ['Uke 7','Bølgeoptikk II','Fresnel, Brewster'],
  ['Uke 8','Bølgeoptikk III+IV','TIR, regnbue, Young'],
  ['Uke 9','Diffraksjon I','Fraunhofer, Airy'],
  ['Uke 10','Diffraksjon II','Fourier, gitter'],
  ['Uke 11','Bølgeoptikk V','Koherens, Michelson, film'],
  ['Uke 12','Bølgeoptikk III','TIR-mikroskopi, ledere'],
  ['Påske','Bølgeoptikk VI','Optiske fibre (selvstudium)']
];

/* ============================ RENDER ============================ */
const PROG_KEY='tfy4195_progress_v1';
function loadProg(){ try{ return JSON.parse(localStorage.getItem(PROG_KEY))||{}; }catch(e){ return window.__prog||{}; } }
function saveProg(p){ window.__prog=p; try{ localStorage.setItem(PROG_KEY,JSON.stringify(p)); }catch(e){} }

function renderHero(){
  return `<section class="hero" id="top">
    <div class="hero-tag">NTNU · Institutt for fysikk · V2026</div>
    <h1>En komplett, interaktiv vei gjennom <span class="grad">optikkens pensum</span></h1>
    <p>Denne guiden dekker hele TFY4195 — fra foton og geometrisk optikk til interferens, koherens og diffraksjon — strukturert rundt det som faktisk testes på eksamen. Hver modul har læringsmål, kjerneteori, formlene fra eksamens-formelarket, eksamenstyper, regneeksempler og selvtester. Fire interaktive simuleringer lar deg leke med fysikken.</p>
    <div class="hero-stats">
      <div class="stat"><b>12</b><span>moduler</span></div>
      <div class="stat"><b>4</b><span>simuleringer</span></div>
      <div class="stat"><b>24</b><span>quiz-spørsmål</span></div>
      <div class="stat"><b>7</b><span>eksamenssett analysert</span></div>
    </div>
  </section>`;
}

function renderPlan(){
  return `<section class="module" id="plan">
    <div class="mod-head"><div class="mod-index">★</div><div class="meta">
      <div class="mod-kicker">Studieplan</div><h2>Semesteret uke for uke</h2>
      <div class="week">Følg rekkefølgen i forelesningene — temaene bygger på hverandre</div>
    </div></div>
    <div class="card"><h3><span class="dot"></span>Slik bruker du guiden mot eksamen</h3>
      <p class="lede">Eksamen er en blanding av flervalg/paringsoppgaver (3–6 p hver) og regneoppgaver, normalisert til 100 %. To oppgaver besvares for hånd (typisk strålegang og en utledning).</p>
      <ol>
        <li><strong>Les modulen</strong> — start med læringsmålene, så kjerneteorien.</li>
        <li><strong>Lær formlene</strong> — alle står på det utdelte formelarket, men du må vite <em>når</em> og <em>hvordan</em> de brukes.</li>
        <li><strong>Gjør regneeksempelet</strong> uten å se på løsningen først.</li>
        <li><strong>Ta selvtesten</strong> — disse er bygget på faktiske eksamensspørsmål.</li>
        <li><strong>Lek med simuleringene</strong> for intuisjon på linser, Fresnel, Young og diffraksjon.</li>
        <li><strong>Kryss av modulen</strong> når du føler deg trygg — følg fremgangslinjen øverst.</li>
      </ol>
      <p><strong>Hjelpemidler på eksamen:</strong> enkel kalkulator, Rottmann-tabell, linjal/vinkelhake (for strålegang), og det provisoriske formelarket. Tren derfor på å bruke nettopp disse formlene.</p>
    </div>
    <div class="plan-grid">
      ${PLAN.map(p=>`<div class="week-card"><div class="wk">${p[0]}</div><div class="wt">${p[1]}</div><div class="wd">${p[2]}</div></div>`).join('')}
    </div>
  </section>`;
}

function renderModule(m, idx, prog){
  const done = prog[m.id] ? 'done':'';
  return `<section class="module" id="${m.id}">
    <div class="mod-head">
      <div class="mod-index">${m.num}</div>
      <div class="meta">
        <div class="mod-kicker">${m.kicker}</div>
        <h2>${m.title}</h2>
        <div class="week">${m.week}</div>
      </div>
      <button class="done-btn ${done}" data-done="${m.id}">${prog[m.id]?'✓ Fullført':'Marker fullført'}</button>
    </div>
    ${m.html}
  </section>`;
}

function renderSidebar(prog){
  let h = `<div class="nav-section">Kom i gang</div>
    <a class="nav-link" data-target="top"><span class="nav-num">↑</span>Oversikt</a>
    <a class="nav-link" data-target="plan"><span class="nav-num">★</span>Studieplan</a>
    <div class="nav-section">Moduler</div>`;
  M.forEach(m=>{
    h += `<a class="nav-link ${prog[m.id]?'done':''}" data-target="${m.id}">
      <span class="nav-num">${m.num}</span>${m.title.split('—')[0].split(',')[0].split('&')[0].trim()}
      <span class="nav-check">✓</span></a>`;
  });
  return h;
}

function updateProgress(prog){
  const total=M.length, done=M.filter(m=>prog[m.id]).length;
  document.getElementById('pfill').style.width=(done/total*100)+'%';
  document.getElementById('ptext').textContent=done+'/'+total;
}

function boot(){
  const prog=loadProg();
  document.getElementById('content').innerHTML =
    renderHero() + renderPlan() + M.map((m,i)=>renderModule(m,i,prog)).join('');
  document.getElementById('sidebar').innerHTML = renderSidebar(prog);
  updateProgress(prog);

  // KaTeX
  if(window.renderMathInElement){
    renderMathInElement(document.body,{
      delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
      throwOnError:false
    });
  }

  // nav scroll + active state
  const links=[...document.querySelectorAll('.nav-link')];
  links.forEach(a=>a.addEventListener('click',()=>{
    const t=document.getElementById(a.dataset.target);
    if(t){ t.scrollIntoView({behavior:'smooth',block:'start'}); }
    if(window.innerWidth<=980) toggleMenu();
  }));

  // quiz logic
  document.querySelectorAll('.opt').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const qid=btn.dataset.qid;
      const group=document.querySelectorAll(`.opt[data-qid="${qid}"]`);
      group.forEach(b=>{
        b.classList.add('disabled');
        if(b.dataset.correct==='true'){ b.classList.add('correct'); b.querySelector('.mark').textContent='✓'; }
      });
      if(btn.dataset.correct!=='true'){ btn.classList.add('wrong'); btn.querySelector('.mark').textContent='✗'; }
      const ex=document.getElementById(qid+'-ex'); if(ex) ex.classList.add('show');
    });
  });

  // done buttons
  document.querySelectorAll('.done-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.dataset.done; const p=loadProg();
      p[id]=!p[id]; saveProg(p);
      btn.classList.toggle('done',p[id]);
      btn.textContent=p[id]?'✓ Fullført':'Marker fullført';
      const nav=document.querySelector(`.nav-link[data-target="${id}"]`);
      if(nav) nav.classList.toggle('done',p[id]);
      updateProgress(p);
    });
  });

  // scroll spy
  const sections=M.map(m=>document.getElementById(m.id)).filter(Boolean);
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){
      links.forEach(l=>l.classList.toggle('active', l.dataset.target===e.target.id));
    }});
  },{rootMargin:'-20% 0px -70% 0px'});
  sections.forEach(s=>obs.observe(s));

  // init visualizations
  initLens(); initFresnel(); initYoung(); initDiff();
}

function resetProgress(){ saveProg({}); document.querySelectorAll('.done-btn').forEach(b=>{b.classList.remove('done');b.textContent='Marker fullført';}); document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('done')); updateProgress({}); }
function toggleMenu(){ document.getElementById('sidebar').classList.toggle('open'); document.getElementById('scrim').classList.toggle('show'); }

/* ============================ VISUALISERINGER ============================ */
function fitCanvas(c){ const r=c.getBoundingClientRect(); const dpr=window.devicePixelRatio||1; c.width=r.width*dpr; c.height=c.height*dpr/(c.__h?c.__h:1); }
function setupCanvas(id,cssH){
  const c=document.getElementById(id); if(!c) return null;
  const dpr=window.devicePixelRatio||1;
  function size(){ const w=c.clientWidth; c.width=w*dpr; c.height=cssH*dpr; const ctx=c.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); c.__w=w; c.__h=cssH; }
  c.style.height=cssH+'px'; size(); window.addEventListener('resize',()=>{ size(); if(c.__draw)c.__draw(); });
  return c;
}

/* ----- 1. Tynnlinse ----- */
function initLens(){
  const c=setupCanvas('lensCanvas',300); if(!c) return; const ctx=c.getContext('2d');
  const so=document.getElementById('soSlider'), f=document.getElementById('fSlider');
  function draw(){
    const W=c.__w,H=c.__h, cx=W*0.5, cy=H*0.5;
    ctx.clearRect(0,0,W,H);
    // axis
    ctx.strokeStyle='#33404f'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    const SO=+so.value, F=+f.value;
    // lens at cx
    ctx.strokeStyle='#5b7cf0'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(cx,cy-95); ctx.lineTo(cx,cy+95); ctx.stroke();
    // lens shape hints
    ctx.fillStyle='rgba(91,124,240,.12)';
    ctx.beginPath(); ctx.ellipse(cx,cy,9,95,0,0,Math.PI*2); ctx.fill();
    // focal points
    ctx.fillStyle='#3fd4d0';
    [[-F,'F'],[F,"F'"]].forEach(p=>{ ctx.beginPath(); ctx.arc(cx+p[0],cy,3,0,7); ctx.fill(); ctx.font='11px IBM Plex Mono'; ctx.fillText(p[1],cx+p[0]-4,cy+18); });
    // object (upright arrow at -SO)
    const ho=55, ox=cx-SO;
    ctx.strokeStyle='#5fd08a'; ctx.lineWidth=2.5; arrow(ctx,ox,cy,ox,cy-ho);
    // image via lens eq: 1/si = 1/f - 1/so
    const si = 1/(1/F - 1/SO);
    const m = -si/SO;
    const hi = m*ho;
    const ix = cx + si;
    const real = si>0;
    // rays from object tip
    const tipX=ox, tipY=cy-ho;
    ctx.lineWidth=1.4;
    // ray 1: parallel then through F'
    ctx.strokeStyle='rgba(240,208,80,.85)'; ctx.beginPath(); ctx.moveTo(tipX,tipY); ctx.lineTo(cx,tipY);
    let ix2=cx+si, iy2=cy-hi; let slope=(iy2-tipY)/(ix2-cx);
    ctx.lineTo(cx + (real? si : Math.min(W-cx, 400)), tipY + slope*((real?si:Math.min(W-cx,400))));
    ctx.stroke();
    // ray 2: through center, straight
    ctx.strokeStyle='rgba(63,212,208,.85)'; ctx.beginPath(); ctx.moveTo(tipX,tipY);
    const s2=(cy-tipY)/(cx-tipX); ctx.lineTo(W, tipY+s2*(W-tipX)); ctx.stroke();
    // image arrow
    if(isFinite(ix)&&Math.abs(ix-cx)<W){
      ctx.strokeStyle = real? '#ef6a6a':'#f0964e'; ctx.setLineDash(real?[]:[5,4]); ctx.lineWidth=2.5;
      arrow(ctx,ix,cy,ix,cy-hi); ctx.setLineDash([]);
    }
    // labels
    ctx.fillStyle='#a7adb8'; ctx.font='12px IBM Plex Mono';
    ctx.fillText('objekt',ox-18,cy+34);
    document.getElementById('soVal').textContent=(SO/30).toFixed(1)+'·f-enheter';
    document.getElementById('fVal').textContent=(F/30).toFixed(1)+' enh';
    const type = !isFinite(si)? 'i uendelig' : real? 'reelt, invertert':'virtuelt, opprett';
    document.getElementById('lensReadout').innerHTML =
      `Med 1/sₒ + 1/sᵢ = 1/f: bildeavstand sᵢ = <b>${isFinite(si)?(si/30).toFixed(2):'∞'}</b> f-enheter, forstørrelse m = <b>${isFinite(m)?m.toFixed(2):'∞'}</b>. Bildet er <b>${type}</b>.`;
  }
  c.__draw=draw; [so,f].forEach(s=>s.addEventListener('input',draw)); draw();
}
function arrow(ctx,x1,y1,x2,y2){ ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); const a=Math.atan2(y2-y1,x2-x1); ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-7*Math.cos(a-0.4),y2-7*Math.sin(a-0.4)); ctx.lineTo(x2-7*Math.cos(a+0.4),y2-7*Math.sin(a+0.4)); ctx.closePath(); ctx.fillStyle=ctx.strokeStyle; ctx.fill(); }

/* ----- 2. Fresnel ----- */
function initFresnel(){
  const c=setupCanvas('fresnelCanvas',300); if(!c) return; const ctx=c.getContext('2d');
  const n1s=document.getElementById('n1Slider'), n2s=document.getElementById('n2Slider');
  function rTE(th,n){ const s=Math.sin(th); const root=Math.sqrt(Math.max(0,n*n-s*s)); const cz=Math.cos(th); if(n*n-s*s<0) return 1; return Math.abs((cz-root)/(cz+root)); }
  function rTM(th,n){ const s=Math.sin(th); const r=n*n-s*s; if(r<0) return 1; const root=Math.sqrt(r); const cz=Math.cos(th); return Math.abs((-n*n*cz+root)/(n*n*cz+root)); }
  function draw(){
    const W=c.__w,H=c.__h, padL=42,padB=30,padT=14,padR=14;
    ctx.clearRect(0,0,W,H);
    const n1=(+n1s.value)/100, n2=(+n2s.value)/100, n=n2/n1;
    const x0=padL,y0=H-padB,pw=W-padL-padR,ph=H-padB-padT;
    // grid
    ctx.strokeStyle='#26303d'; ctx.fillStyle='#6b7480'; ctx.font='10px IBM Plex Mono'; ctx.lineWidth=1;
    for(let R=0;R<=1;R+=0.25){ const y=y0-R*ph; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x0+pw,y); ctx.stroke(); ctx.fillText(R.toFixed(2),6,y+3); }
    for(let d=0;d<=90;d+=15){ const x=x0+d/90*pw; ctx.fillText(d+'°',x-8,H-12); }
    ctx.fillText('R',x0-6,padT+4);
    // curves (R = r^2)
    function plot(fn,color,dash){ ctx.strokeStyle=color; ctx.lineWidth=2; ctx.setLineDash(dash||[]); ctx.beginPath();
      for(let i=0;i<=180;i++){ const th=i/180*(Math.PI/2); const Rr=fn(th,n)**2; const x=x0+(i/180)*pw; const y=y0-Math.min(1,Rr)*ph; i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); ctx.setLineDash([]); }
    plot(rTE,'#5b7cf0'); plot(rTM,'#f0964e');
    // legend
    ctx.font='12px IBM Plex Mono';
    ctx.fillStyle='#5b7cf0'; ctx.fillText('— R (TE)',x0+pw-92,padT+12);
    ctx.fillStyle='#f0964e'; ctx.fillText('— R (TM)',x0+pw-92,padT+28);
    document.getElementById('n1Val').textContent=n1.toFixed(2);
    document.getElementById('n2Val').textContent=n2.toFixed(2);
    let msg;
    if(n2>n1){ const bp=Math.atan(n2/n1)*180/Math.PI; msg=`Eksternt (n₂>n₁): Brewster-vinkel θ_p = <b>${bp.toFixed(1)}°</b> der TM-kurven (oransje) berører null — reflektert lys er lineært polarisert.`; }
    else if(n2<n1){ const tc=Math.asin(n2/n1)*180/Math.PI; const bp=Math.atan(n2/n1)*180/Math.PI; msg=`Internt (n₂<n₁): Brewster θ_p = <b>${bp.toFixed(1)}°</b>, kritisk vinkel θ_c = <b>${tc.toFixed(1)}°</b>. Over θ_c går begge til R=1 (total intern refleksjon).`; }
    else { msg='n₁ = n₂: ingen flate, ingen refleksjon.'; }
    document.getElementById('fresnelReadout').innerHTML=msg;
  }
  c.__draw=draw; [n1s,n2s].forEach(s=>s.addEventListener('input',draw)); draw();
}

/* ----- 3. Young ----- */
function initYoung(){
  const c=setupCanvas('youngCanvas',220); if(!c) return; const ctx=c.getContext('2d');
  const a=document.getElementById('aSlider'), lam=document.getElementById('lamSlider');
  function wl2rgb(w){ let r,g,b; if(w<440){r=-(w-440)/60;g=0;b=1;} else if(w<490){r=0;g=(w-440)/50;b=1;} else if(w<510){r=0;g=1;b=-(w-510)/20;} else if(w<580){r=(w-510)/70;g=1;b=0;} else if(w<645){r=1;g=-(w-645)/65;b=0;} else {r=1;g=0;b=0;} return `rgb(${(r*255)|0},${(g*255)|0},${(b*255)|0})`; }
  function draw(){
    const W=c.__w,H=c.__h; ctx.clearRect(0,0,W,H);
    const A=+a.value, L=+lam.value; const col=wl2rgb(L);
    // intensity strip
    const cy=H*0.42, sh=70;
    for(let x=0;x<W;x++){
      const theta=(x-W/2)/W*0.5;
      const I=Math.cos(Math.PI*A*theta/(L/550))**2; // scaled
      ctx.fillStyle=col; ctx.globalAlpha=I; ctx.fillRect(x,cy-sh/2,1,sh);
    }
    ctx.globalAlpha=1;
    // intensity curve
    ctx.strokeStyle=col; ctx.lineWidth=2; ctx.beginPath();
    const gy=H-22, gh=70;
    for(let x=0;x<W;x++){ const theta=(x-W/2)/W*0.5; const I=Math.cos(Math.PI*A*theta/(L/550))**2; const y=gy-I*gh; x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();
    ctx.fillStyle='#6b7480'; ctx.font='11px IBM Plex Mono'; ctx.fillText('intensitet I = 4I₀cos²(πa·sinθ/λ)',10,gy-gh-6);
    document.getElementById('aVal').textContent=(A/40).toFixed(1)+'×';
    document.getElementById('lamVal').textContent=L+' nm';
    document.getElementById('youngReadout').innerHTML=`Stripeavstand Δy = λL/a. Større spaltavstand <b>a</b> ⇒ tettere striper; lengre bølgelengde <b>λ</b> ⇒ bredere striper. (${L} nm ≈ ${L<490?'blått':L<560?'grønt':L<590?'gult':'rødt'} lys.)`;
  }
  c.__draw=draw; [a,lam].forEach(s=>s.addEventListener('input',draw)); draw();
}

/* ----- 4. Diffraksjon ----- */
function initDiff(){
  const c=setupCanvas('diffCanvas',240); if(!c) return; const ctx=c.getContext('2d');
  const N=document.getElementById('NSlider'), b=document.getElementById('bSlider'), a=document.getElementById('aDSlider');
  function draw(){
    const W=c.__w,H=c.__h; ctx.clearRect(0,0,W,H);
    const NN=+N.value, B=(+b.value)/1000, A=(+a.value)/1000;
    const gy=H-26, gh=H-60;
    // envelope
    ctx.strokeStyle='rgba(240,150,78,.5)'; ctx.lineWidth=1.5; ctx.setLineDash([5,4]); ctx.beginPath();
    for(let x=0;x<W;x++){ const u=(x-W/2)/W*Math.PI*8; const beta=B*u*60; const env=beta===0?1:(Math.sin(beta)/beta)**2; const y=gy-env*gh; x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); ctx.setLineDash([]);
    // full pattern
    ctx.strokeStyle='#5b7cf0'; ctx.lineWidth=2; ctx.beginPath();
    for(let x=0;x<W;x++){ const u=(x-W/2)/W*Math.PI*8; const beta=B*u*60; const alpha=A*u*60;
      const env=beta===0?1:(Math.sin(beta)/beta)**2;
      const gr= Math.abs(Math.sin(alpha))<1e-6 ? NN*NN : (Math.sin(NN*alpha)/Math.sin(alpha))**2;
      const I=env*gr/(NN*NN); const y=gy-Math.min(1,I)*gh; x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();
    ctx.fillStyle='#6b7480'; ctx.font='11px IBM Plex Mono'; ctx.fillText('I = I₀(sinβ/β)²·(sinNα/sinα)²   — stiplet: enkeltspalt-konvolutt',10,18);
    document.getElementById('NVal').textContent=NN;
    document.getElementById('bVal').textContent=(+b.value);
    document.getElementById('aDVal').textContent=(+a.value);
    document.getElementById('diffReadout').innerHTML=`N = <b>${NN}</b> spalt${NN>1?'er':''}. ${NN===1?'Ren enkeltspalt: bred sentraltopp, minima ved b·sinθ=mλ.':`${NN-1} minima og ${NN-2<0?0:NN-2} sekundærmaksima mellom hovedmaksima. Smalere spalt b ⇒ bredere konvolutt; større a ⇒ tettere hovedtopper.`}`;
  }
  c.__draw=draw; [N,b,a].forEach(s=>s.addEventListener('input',draw)); draw();
}

/* ============================ FOOTER + BOOT ============================ */
document.addEventListener('DOMContentLoaded',()=>{
  boot();
  const f=document.createElement('div'); f.className='footer';
  f.innerHTML=`<span class="grad">TFY4195 Optikk</span> · Interaktiv pensumguide · bygget fra pensumliste, formelark og eksamenssett 2018–2025<br>Lykke til på eksamen! Husk linjal og vinkelhake til strålegang-oppgavene.`;
  document.querySelector('.content').appendChild(f);
});
