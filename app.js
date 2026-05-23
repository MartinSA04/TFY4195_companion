/* ===================================================================
   TFY4195 Optikk — interaktiv pensumguide
   Innhold bygget fra pensumliste, formelark og eksamenssett (2018–2025)
   =================================================================== */

/* ---------- små byggesteiner for HTML ---------- */
const goals = (items)=>`<div class="card goals"><h3><span class="dot"></span>Læringsmål</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
const formulas = (rows)=>`<div class="formula-box">${rows.map(r=>`<div class="formula-row${r[2]?' offsheet':''}"><span class="fx">${r[0]}</span><span class="desc">${r[1]}${r[2]?' <span class="pugg" title="Står ikke på formelarket – må pugges">★ ikke på formelarket</span>':''}</span></div>`).join('')}</div>`;
const exam = (tags, body)=>`<div class="card exam"><h3><span class="dot"></span>Slik testes dette på eksamen</h3><div class="tagrow">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>${body}</div>`;
const reveal = (label, html)=>`<details class="reveal"><summary>${label||'Vis løsning'}</summary>${html}</details>`;
const concept = (title, html)=>`<div class="card concept"><h3><span class="dot"></span>${title}</h3>${html}</div>`;
const workedExample = (title, problem, solution, answer)=>`<div class="card worked"><h3><span class="dot"></span>${title}</h3><div class="prob">${problem}</div>${reveal('Vis løsning', `${solution}<span class="answer">${answer}</span>`)}</div>`;
const practiceBlock = (cfg)=>concept(cfg.explainTitle, cfg.explain)
  + workedExample(cfg.workedTitle, cfg.problem, cfg.solution, cfg.answer)
  + quizCard('Flere kontrollspørsmål', cfg.questions);

/* quiz-bygger: spørsmål med alternativer (riktig markert), forklaring */
let QID=0;
function quizCard(title, questions){
  const qs = questions.map(q=>{
    const qid='q'+(QID++);
    const opts = q.opts.map((o,i)=>`<button class="opt" data-qid="${qid}" data-correct="${i===q.answer}">${o}<span class="mark"></span></button>`).join('');
    return `<div class="q"><div class="qtext"><span class="qn">${q.n||''}</span>${q.q}</div>${opts}<div class="explain" id="${qid}-ex" role="status" aria-live="polite">${q.ex||''}</div></div>`;
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
      ['$\\Omega = \\dfrac{A}{r^2}$','Romvinkel i steradianer.', true]
    ])
  + exam(['Foton-energi fra spektrum','Egenskaper (MC)','Enhetsregning'],
      `<p>Et veldig vanlig oppgave-par: du får et spektrum (f.eks. en blå LED fra ThorLabs) og skal finne <strong>foton-energien</strong> ved toppbølgelengden, ofte som forberedelse til et koherens-spørsmål. MC-spørsmål spør hvilken egenskap som <em>ikke</em> hører til fotonet (fellen er Fermi–Dirac).</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel</h3>
     <div class="prob">En LED har toppbølgelengde $\\lambda \\approx 465\\text{ nm}$. Hva er foton-energien (i eV)?</div>
     <div class="step"><span class="lbl">Formel</span><p>$E=\\dfrac{hc}{\\lambda}$. Praktisk: $hc = 1240\\text{ eV}\\cdot\\text{nm}$.</p></div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Innsetting</span><p>$E=\\dfrac{1240\\text{ eV}\\cdot\\text{nm}}{465\\text{ nm}} \\approx 2{,}67\\text{ eV}$.</p></div>
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
      ['$n_i\\sin\\theta_i=n_t\\sin\\theta_t$','Snells lov. Vinkler måles fra <strong>normalen</strong>; indeks <em>i</em> = innfallsmedium, <em>t</em> = transmittert medium.'],
      ['$\\dfrac{1}{s_o}+\\dfrac{1}{s_i}=\\dfrac{1}{f}$','Tynnlinse-/avbildningslikningen. $s_o$ = objektavstand, $s_i$ = bildeavstand, $f$ = brennvidde.'],
      ['$m=-\\dfrac{s_i}{s_o}$','Lateral forstørrelse. <b>m<0</b> = invertert.'],
      ['$\\dfrac{1}{f}=\\dfrac{n_2-n_1}{n_1}\\!\\left(\\dfrac{1}{R_1}-\\dfrac{1}{R_2}\\right)$','Linsemakerformelen (linse $n_2$ i medium $n_1$). $R_1,R_2$ = krumningsradier for fram- og bakflate (med fortegn).'],
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
     <canvas id="lensCanvas" height="300" role="img" aria-label="Interaktiv figur av tynnlinse-avbildning som oppdateres når du justerer objektavstand og brennvidde nedenfor."></canvas>
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

/* ---- Ray tracing — komplett matriseguide (eksamensfokus) ---- */
M.push({
  id:'raytracing', num:'RT', kicker:'Eksamensfokus · Geometrisk optikk', title:'Ray tracing — komplett matriseguide', week:'Eksamensguide · PP Kap. 18 / 2.8',
  html:
  goals([
    'Representere en paraksial stråle som en vektor $(y,\\alpha)$ og vite hva hvert tall betyr.',
    'Skrive ned <strong>alle byggematrisene</strong> (translasjon, plan/sfærisk brytning, tynn linse, speil) fra hukommelsen.',
    'Sette sammen <strong>systemmatrisen</strong> i riktig rekkefølge og kontrollere med determinanten.',
    'Lese ut <strong>bildeplan ($B=0$), forstørrelse ($A=m$), afokalitet ($C=0$) og effektiv brennvidde ($f=-1/C$)</strong>.',
    'Koble matriseelementene til <strong>kardinalpunkt-formlene</strong> på formelarket.'
  ])
  + concept('Kjernen i temaet', `
     <p class="lede">Ray tracing med matriser er den mest eksamensnære delen av geometrisk optikk: nesten hvert eksamenssett har en «match system ↔ matrise»-oppgave eller ber deg regne deg gjennom et linsesystem. Hele trikset er at paraksial optikk er <em>lineær</em>.</p>
     <p>En stråle beskrives ved <strong>høyden $y$</strong> over den optiske aksen og <strong>vinkelen $\\alpha$</strong> den danner med aksen. Hvert optisk element transformerer $(y,\\alpha)$ lineært, så det kan skrives som en $2\\times2$-matrise:</p>
     <p>$\\begin{pmatrix} y_2 \\\\ \\alpha_2 \\end{pmatrix} = \\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix}\\begin{pmatrix} y_1 \\\\ \\alpha_1 \\end{pmatrix}$</p>
     <p>Et helt system er <strong>produktet</strong> av elementmatrisene. Da kan du behandle et komplisert instrument som én enkelt matrise og lese av alt du trenger fra de fire tallene $A,B,C,D$.</p>`)
  + `<div class="card viz"><h3><span class="dot"></span>Visuelt: strålevektoren $(y,\\alpha)$</h3>
     <p>Hver stråle er ett punkt beskrevet av to tall: høyden $y$ over aksen og helningen $\\alpha$. Det er disse to tallene matrisene virker på.</p>
     <canvas id="rayVecCanvas" role="img" aria-label="Figur som viser strålevektoren med høyde y og vinkel alfa over den optiske aksen."></canvas>
     </div>`
  + `<div class="card"><h3><span class="dot"></span>Fortegnskonvensjon — fest dette først</h3>
     <p>Feil fortegn er vanligere enn feil algebra. Pedrotti-konvensjonen (lys går venstre → høyre):</p>
     <table class="ftable">
       <tr><th>Størrelse</th><th>Positiv når …</th><th>Tolkning</th></tr>
       <tr><td>$y$</td><td>over aksen</td><td>strålehøyde</td></tr>
       <tr><td>$\\alpha$</td><td>strålen heller oppover (mot klokken)</td><td>liten vinkel, $\\tan\\alpha\\approx\\alpha$</td></tr>
       <tr><td>$R$</td><td>krumningssenter til <em>høyre</em> for flaten</td><td>konveks mot innkommende lys ⇒ $R>0$</td></tr>
       <tr><td>$s_o$</td><td>objekt til venstre for flaten</td><td>reelt objekt</td></tr>
       <tr><td>$s_i$</td><td>bilde til høyre for flaten</td><td>reelt bilde</td></tr>
       <tr><td>$f$</td><td>samlende element</td><td>positiv linse / konkavt speil</td></tr>
     </table>
     <p>Vinkelen holdes liten (paraksial: $\\sin\\alpha\\approx\\tan\\alpha\\approx\\alpha$ i radianer).</p>
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Visuelt: fortegn & avbildning</h3>
     <p>Objektavstand $s_o$ (venstre) og bildeavstand $s_i$ (høyre) måles fra linsen, brennvidden $f$ til brennpunktene $F,F'$. To hjelpestråler — parallell$\\to$gjennom $F'$, og rett gjennom sentrum — konstruerer bildet. Objektet står utenfor $2f$, så bildet blir reelt, invertert og forminsket.</p>
     <canvas id="signConvCanvas" role="img" aria-label="Figur som illustrerer fortegnskonvensjonen for objekt- og bildeavstand ved avbildning."></canvas>
     </div>`
  + `<div class="card"><h3><span class="dot"></span>De fem byggematrisene</h3>
     <h4>1 · Translasjon (fri propagasjon avstand $d$)</h4>
     <p>Vinkelen er uendret, høyden vokser: $y_2=y_1+d\\,\\alpha_1,\\ \\alpha_2=\\alpha_1$.</p>
     <p>$T(d)=\\begin{pmatrix}1 & d \\\\ 0 & 1\\end{pmatrix}$ &nbsp;($d$ er en geometrisk avstand — samme uansett medium).</p>
     <h4>2 · Brytning i plan flate ($n_1\\to n_2$)</h4>
     <p>Høyden er uendret; Snell i paraksial form $n_1\\alpha_1=n_2\\alpha_2$ gir $\\alpha_2=(n_1/n_2)\\alpha_1$.</p>
     <p>$R_P=\\begin{pmatrix}1 & 0 \\\\ 0 & n_1/n_2\\end{pmatrix}$</p>
     <h4>3 · Brytning i sfærisk flate (radius $R$)</h4>
     <p>Grunnsteinen — tynn og tykk linse bygges av to slike.</p>
     <p>$R_S=\\begin{pmatrix}1 & 0 \\\\ \\dfrac{n_1-n_2}{n_2 R} & n_1/n_2\\end{pmatrix}$</p>
     <h4>4 · Tynn linse (brennvidde $f$)</h4>
     <p>To sfæriske flater med neglisjerbar tykkelse kollapser til ett «kick» i vinkelen: $\\alpha_2=\\alpha_1-y/f$.</p>
     <p>$L(f)=\\begin{pmatrix}1 & 0 \\\\ -1/f & 1\\end{pmatrix},\\qquad \\dfrac1f=\\dfrac{n_2-n_1}{n_1}\\!\\left(\\dfrac1{R_1}-\\dfrac1{R_2}\\right)$</p>
     <h4>5 · Sfærisk speil (radius $R$)</h4>
     <p>Virker som en linse med $f=R/2$, men folder strålegangen. Utbrettet matrise:</p>
     <p>$M_\\text{speil}=\\begin{pmatrix}1 & 0 \\\\ -2/R & 1\\end{pmatrix}=\\begin{pmatrix}1 & 0 \\\\ -1/f & 1\\end{pmatrix}$</p>
     <p><strong>Tykk linse:</strong> $M=R_S^{(2)}\\,T(t)\\,R_S^{(1)}$ — to flater med glasstykkelse $t$ imellom.</p>
     </div>`
  + `<div class="card viz"><h3><span class="dot"></span>Visuelt: hva hvert element gjør med en stråle</h3>
     <p>Translasjon flytter strålen uten å endre vinkelen; en tynn linse knekker vinkelen mot brennpunktet; en brytende flate endrer vinkelen etter Snell (høyden $y$ er kontinuerlig). Det er nettopp disse virkningene matrisene koder.</p>
     <canvas id="elemActCanvas" role="img" aria-label="Figur som viser hvordan hvert optiske byggeelement virker på en stråle."></canvas>
     </div>`
  + formulas([
      ['$T(d)=\\begin{pmatrix}1 & d \\\\ 0 & 1\\end{pmatrix}$','Translasjon (fri propagasjon).'],
      ['$R_P=\\begin{pmatrix}1 & 0 \\\\ 0 & n_1/n_2\\end{pmatrix}$','Brytning, plan flate.'],
      ['$R_S=\\begin{pmatrix}1 & 0 \\\\ \\frac{n_1-n_2}{n_2 R} & n_1/n_2\\end{pmatrix}$','Brytning, sfærisk flate.'],
      ['$L(f)=\\begin{pmatrix}1 & 0 \\\\ -1/f & 1\\end{pmatrix}$','Tynn linse.'],
      ['$M_\\text{speil}=\\begin{pmatrix}1 & 0 \\\\ -2/R & 1\\end{pmatrix}$','Sfærisk speil ($f=R/2$).', true]
    ])
  + `<div class="card"><h3><span class="dot"></span>Bygg systemmatrisen — rekkefølgen er alt</h3>
     <p>Lyset møter elementene i rekkefølge 1, 2, 3 …, men matrisene skrives i <strong>motsatt</strong> rekkefølge fordi de virker fra høyre på strålevektoren:</p>
     <p>$M_\\text{sys}=M_n\\cdots M_2\\,M_1$ &nbsp;— det siste elementet lyset møter står lengst til venstre.</p>
     <ul>
       <li><strong>Determinant-sjekk:</strong> $\\det M_\\text{sys}=n_\\text{start}/n_\\text{slutt}$. Starter og slutter du i samme medium (f.eks. luft) skal $\\det M=1$. Dette fanger regnefeil umiddelbart.</li>
       <li>Tegn systemet i fysisk rekkefølge på papir først, og «les baklengs» når du setter opp produktet.</li>
     </ul>
     </div>`
  + `<div class="card"><h3><span class="dot"></span>Les av de fire tallene</h3>
     <table class="ftable">
       <tr><th>Betingelse</th><th>Betyr</th><th>Bruk</th></tr>
       <tr><td>$B=0$</td><td>inn- og utplan er konjugerte (objekt↔bilde)</td><td>finn bildeplanet</td></tr>
       <tr><td>$A$ ved $B=0$</td><td>lateral forstørrelse $m$</td><td>$m=A$; fortegn ⇒ reelt/virtuelt</td></tr>
       <tr><td>$C=0$</td><td>afokalt / teleskopisk system</td><td>parallelt inn ⇒ parallelt ut</td></tr>
       <tr><td>$D$ ved $C=0$</td><td>vinkelforstørrelse</td><td>$\\alpha_2=D\\,\\alpha_1$</td></tr>
       <tr><td>$-1/C$</td><td>effektiv brennvidde $f$</td><td>systemets brennvidde</td></tr>
       <tr><td>$-A/C$</td><td>bakre brennavstand (BFD)</td><td>hvor fjernt lys fokuserer bak utplanet</td></tr>
     </table>
     <p><strong>Kobling til formelarket:</strong> kardinalpunkt-formlene ($p=D/C,\\ q=-A/C,\\ f_s=-1/C$ osv.) er nettopp disse matriseelementene. Kjenner du $A,B,C,D$, plugger du rett inn.</p>
     </div>`
  + `<div class="card"><h3><span class="dot"></span>Ekvivalens av optiske veier</h3>
     <p>Den <strong>optiske veilengden</strong> (OPL) er $\\text{OPL}=\\sum_j n_j d_j$ — geometrisk lengde vektet med brytningsindeks. Lyset «føler» optisk vei, ikke geometrisk avstand: hver meter teller mer i et tregt medium (høy $n$).</p>
     <p><strong>Fermats prinsipp:</strong> en stråle følger den veien som gir <em>stasjonær</em> (oftest minste) optiske veilengde.</p>
     <h4>Avbildningsteoremet</h4>
     <p>Mellom et objektpunkt og dets bildepunkt har <strong>alle stråler samme optiske veilengde</strong> — de er likeverdige. Derfor ankommer de i fase og danner et skarpt, reelt bilde. En samlende linse fungerer nettopp fordi den <em>utligner</em> veiene: en randstråle går lengre i luft, men gjennom mindre glass; en aksenær stråle går kortere i luft, men gjennom mer (tregt) glass — netto OPL blir lik.</p>
     <p>Formelarket skriver betingelsen for en brytende flate som $n_o d_o + n_i d_i = n_o s_o + n_i s_i$: to ulike veier mellom konjugerte punkter har lik optisk lengde.</p>
     <h4>Kobling til matrisemetoden</h4>
     <p>Betingelsen $B=0$ er stråleoptikkens versjon av akkurat dette: utgangshøyden er uavhengig av inngangsvinkelen ⇔ alle stråler fra ett objektpunkt møtes igjen i ett bildepunkt ⇔ hver stråle har lik optisk vei dit. Bølge- og strålebildet sier altså det samme.</p>
     </div>`
  + exam(['Match system ↔ matrise','Forstørrelse fra A','Afokalt (C=0)','Effektiv f fra C','Kardinalpunkter'],
      `<p>Den klassiske «match the optical system with the ray-transfer matrix» tester strukturgjenkjenning: et nullelement nederst til venstre ($C=0$) = afokalt; et rent $B$-tall = en translasjon; $A=1, D=1$ med $C\\neq0$ = én tynn linse. Andre oppgaver gir en systemmatrise og ber om forstørrelsen ($m=A$ når $B=0$), effektiv brennvidde ($-1/C$), eller hvor et fjernt objekt fokuserer ($-A/C$). Regneoppgaver ber deg multiplisere 2–4 matriser — pass på rekkefølgen og bruk $\\det M$ som sjekk.</p>`)
  + `<div class="card viz"><h3><span class="dot"></span>Interaktivt: to-linse ray tracer</h3>
     <p>En punktkilde sender en stråleknippe gjennom to tynne linser. Dra brennviddene og avstanden og se strålene bøye i hvert linseplan og hvor det endelige bildet (oransje) dannes. Systemmatrisen $M=L_2\\,T(D)\\,L_1$ regnes ut live under figuren.</p>
     <canvas id="rayCanvas" height="320" role="img" aria-label="Interaktiv to-linse ray tracer som oppdateres når du justerer brennvidder og avstand nedenfor."></canvas>
     <div class="controls">
       <div class="ctrl"><label>Brennvidde linse 1 $f_1$ <span class="v" id="f1Val"></span></label><input type="range" id="f1Slider" min="40" max="220" value="90"></div>
       <div class="ctrl"><label>Brennvidde linse 2 $f_2$ <span class="v" id="f2Val"></span></label><input type="range" id="f2Slider" min="40" max="220" value="70"></div>
       <div class="ctrl"><label>Linseavstand $D$ <span class="v" id="dVal"></span></label><input type="range" id="dSlider" min="20" max="320" value="150"></div>
     </div>
     <div class="readout" id="rayReadout"></div>
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 1 — tynn linse via matrise</h3>
     <div class="prob">Et objekt står $s_o=30\\text{ cm}$ foran en tynn linse med $f=20\\text{ cm}$. Sett opp systemmatrisen fra objekt- til bildeplan, og finn bildeavstand og forstørrelse.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Oppsett</span><p>Fra objekt til bilde: $M=T(s_i)\\,L(f)\\,T(s_o)$. Utmultiplisert:</p><p>$M=\\begin{pmatrix}1-\\frac{s_i}{f} & s_o+s_i-\\frac{s_i s_o}{f}\\\\ -\\frac1f & 1-\\frac{s_o}{f}\\end{pmatrix}$.</p></div>
        <div class="step"><span class="lbl">Bildeplan: $B=0$</span><p>$s_o+s_i-\\frac{s_i s_o}{f}=0$. Med $s_o=30,\\ f=20$: $30+s_i-1{,}5\\,s_i=0\\Rightarrow 30-0{,}5\\,s_i=0\\Rightarrow s_i=60\\text{ cm}$.</p></div>
        <div class="step"><span class="lbl">Forstørrelse</span><p>$m=A=1-\\frac{s_i}{f}=1-\\frac{60}{20}=-2$. Kontroll: $\\det M=1$ ✓.</p></div>
        <span class="answer">sᵢ = 60 cm, m = −2 (reelt, invertert, 2× forstørret)</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 2 — enkelt sfærisk flate</h3>
     <div class="prob">En lang glasstav ($n=1{,}50$) har en konveks endeflate med $R=+20\\text{ mm}$. Et objekt står $80\\text{ mm}$ ute i lufta foran flaten. Hvor dannes bildet, og hva er forstørrelsen?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Avbildningslikning</span><p>$B=0$ for $T(s_i)\\,R_S\\,T(s_o)$ gir enkeltflate-likningen $\\dfrac{n_1}{s_o}+\\dfrac{n_2}{s_i}=\\dfrac{n_2-n_1}{R}$.</p></div>
        <div class="step"><span class="lbl">Innsetting</span><p>$\\dfrac{1}{80}+\\dfrac{1{,}5}{s_i}=\\dfrac{0{,}5}{20}=0{,}025\\Rightarrow \\dfrac{1{,}5}{s_i}=0{,}0125\\Rightarrow s_i=120\\text{ mm}$ (inne i glasset, reelt).</p></div>
        <div class="step"><span class="lbl">Forstørrelse</span><p>$m=-\\dfrac{n_1 s_i}{n_2 s_o}=-\\dfrac{1\\cdot120}{1{,}5\\cdot80}=-1$ (invertert, like stort).</p></div>
        <span class="answer">sᵢ = 120 mm inne i glasset, m = −1</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 3 — afokalt teleskop</h3>
     <div class="prob">Et Kepler-teleskop har objektiv $f_1=100\\text{ cm}$ og okular $f_2=4\\text{ cm}$, satt i avstand $D=f_1+f_2=104\\text{ cm}$. Vis at systemet er afokalt og finn vinkelforstørrelsen.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Systemmatrise</span><p>$M=L(f_2)\\,T(D)\\,L(f_1)$ gir $C=-\\dfrac1{f_1}-\\dfrac1{f_2}+\\dfrac{D}{f_1 f_2}$.</p></div>
        <div class="step"><span class="lbl">Afokal-sjekk</span><p>$C=-0{,}01-0{,}25+\\dfrac{104}{400}=-0{,}26+0{,}26=0$ ⇒ afokalt ✓.</p></div>
        <div class="step"><span class="lbl">Vinkelforstørrelse</span><p>$D_\\text{el}=1-\\dfrac{D}{f_2}=1-26=-25$. Parallelt inn ⇒ $\\alpha_2=D_\\text{el}\\,\\alpha_1$, så $MP=-25\\ (=-f_1/f_2)$.</p></div>
        <span class="answer">C = 0 (afokalt), MP = −25</span>`)}
     </div>`
  + `<div class="card concept"><h3><span class="dot"></span>Flere regneoppgaver</h3>
     <p>Prøv selv før du åpner løsningen. Tegn systemet og bruk $\\det M=1$ som sjekk.</p>
     <div class="prob">a) To tynne linser, $f_1=+15\\text{ cm}$ og $f_2=-15\\text{ cm}$, står i avstand $D=10\\text{ cm}$ (luft). Finn systemmatrisen og effektiv brennvidde.</div>
     ${reveal('Vis løsning a)',
       `<p>$A=1-D/f_1=1-\\tfrac{10}{15}=\\tfrac13$, &nbsp; $B=D=10$, &nbsp; $D_\\text{el}=1-D/f_2=1+\\tfrac{10}{15}=\\tfrac53$.</p>
        <p>$C=-\\dfrac1{15}-\\dfrac1{-15}+\\dfrac{10}{15\\cdot(-15)}=-\\dfrac{10}{225}=-0{,}0444\\text{ cm}^{-1}$.</p>
        <p>$\\det M=\\tfrac13\\cdot\\tfrac53-10\\cdot(-0{,}0444)=0{,}556+0{,}444=1$ ✓. &nbsp; $f=-1/C=+22{,}5\\text{ cm}$.</p>
        <span class="answer">f_eff = 22,5 cm (telefoto: lengre f enn begge linsene hver for seg)</span>`)}
     <div class="prob">b) Et konkavt speil har $R=40\\text{ cm}$. Et objekt står $60\\text{ cm}$ foran. Hvor dannes bildet?</div>
     ${reveal('Vis løsning b)',
       `<p>Speil: $f=R/2=20\\text{ cm}$. $\\dfrac1{s_i}=\\dfrac1f-\\dfrac1{s_o}=\\dfrac1{20}-\\dfrac1{60}=\\dfrac1{30}$.</p>
        <p>$s_i=30\\text{ cm}$, &nbsp; $m=-s_i/s_o=-0{,}5$.</p>
        <span class="answer">sᵢ = 30 cm foran speilet, reelt og invertert, m = −0,5</span>`)}
     <div class="prob">c) En fisk svømmer $12\\text{ cm}$ under vannflaten ($n=1{,}33$). På hvilken dybde ser du fisken rett ovenfra?</div>
     ${reveal('Vis løsning c)',
       `<p>Plan flate, $R=\\infty$ ⇒ $\\dfrac{n_1}{s_o}+\\dfrac{n_2}{s_i}=0$. Lys vann→luft: $n_1=1{,}33,\\ n_2=1{,}0$.</p>
        <p>$s_i=-\\dfrac{n_2}{n_1}s_o=-\\dfrac{1}{1{,}33}\\cdot12=-9{,}0\\text{ cm}$ (virtuelt, grunnere).</p>
        <span class="answer">Tilsynelatende dybde ≈ 9,0 cm</span>`)}
     <div class="prob">d) En beam expander bruker $f_1=20\\text{ mm}$ og $f_2=100\\text{ mm}$ i afokal oppstilling. Hvor mye utvides en kollimert stråle?</div>
     ${reveal('Vis løsning d)',
       `<p>Afokal: $D=f_1+f_2=120\\text{ mm}$ ⇒ $C=0$. &nbsp; $A=1-D/f_1=1-6=-5$.</p>
        <p>Kollimert inn ($\\alpha_1=0$): $y_2=A\\,y_1$, så stråle­diameteren skaleres med $|A|=5$.</p>
        <span class="answer">5× utvidelse (= f₂/f₁)</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Lyset møter element 1, så 2, så 3. Systemmatrisen er …',
       opts:['$M_1M_2M_3$','$M_3M_2M_1$','$M_2M_3M_1$','rekkefølgen er likegyldig'],
       answer:1, ex:'Matrisene virker fra høyre på $(y,\\alpha)$, så det siste elementet lyset møter står lengst til venstre: $M_3M_2M_1$.'},
      {n:'2', q:'For et system som starter og slutter i luft skal determinanten være …',
       opts:['$0$','$1$','$n_1/n_2$','$-1$'],
       answer:1, ex:'$\\det M=n_\\text{start}/n_\\text{slutt}=1$ i samme medium — en rask regnefeil-sjekk.'},
      {n:'3', q:'$B=0$ i systemmatrisen betyr at …',
       opts:['systemet er afokalt','inn- og utplan er objekt/bilde-konjugerte','forstørrelsen er 1','strålen er parallell med aksen'],
       answer:1, ex:'$B=0$ ⇒ utgangshøyden er uavhengig av inngangsvinkelen ⇒ alle stråler fra ett objektpunkt samles ⇒ bilde. Da er $A=m$.'},
      {n:'4', q:'Et afokalt (teleskopisk) system kjennetegnes ved …',
       opts:['$A=0$','$B=0$','$C=0$','$D=0$'],
       answer:2, ex:'$C=0$ gjør at parallelle stråler inn forblir parallelle ut.'},
      {n:'5', q:'Den effektive brennvidden til et system leses av som …',
       opts:['$f=B$','$f=-1/C$','$f=A/D$','$f=\\det M$'],
       answer:1, ex:'$f=-1/C$. Kardinalpunkt-formlene på formelarket bygger på nettopp dette.'},
      {n:'6', q:'Hvilken byggematrise står IKKE på formelarket?',
       opts:['translasjon','tynn linse','sfærisk speil','plan brytning'],
       answer:2, ex:'Speilmatrisen $\\begin{pmatrix}1&0\\\\-2/R&1\\end{pmatrix}$ må du huske selv; arket gir bare $f=\\mp R/2$.'}
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
      ['$MP_\\text{lupe}=\\dfrac{25\\text{ cm}}{f}$','Enkel lupe (bilde i uendelig). $MP$ = vinkelforstørrelse (ikke lateral $m$); 25 cm = øyets nærpunkt.', true],
      ['$M_\\text{mik}=-\\dfrac{L}{f_o}\\cdot\\dfrac{25}{f_e}$','Sammensatt mikroskop, tubuslengde $L$. $f_o$ = objektiv-, $f_e$ = okularbrennvidde.', true],
      ['$MP_\\text{tel}=-\\dfrac{f_o}{f_e}$','Teleskop (refraktor): vinkelforstørrelse = objektiv- delt på okularbrennvidde.', true],
      ['$f\\#=\\dfrac{f}{D}$','f-tall: brennvidde / aperturdiameter.', true]
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
      ['$\\vec E=\\vec E_0\\cos(\\vec k\\cdot\\vec r-\\omega t)$','Plan-bølge, med $\\omega=kv,\\ k=2\\pi/\\lambda$.', true],
      ['$B_0=E_0/v$','Forhold mellom amplitudene.', true],
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
      ['$r_{TE}=\\dfrac{\\cos\\theta-\\sqrt{n^2-\\sin^2\\theta}}{\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}$','TE-refleksjonskoeff. (s-pol: $\\vec E$ vinkelrett på innfallsplanet). $n=n_2/n_1$.'],
      ['$r_{TM}=\\dfrac{-n^2\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}{n^2\\cos\\theta+\\sqrt{n^2-\\sin^2\\theta}}$','TM-refleksjonskoeff. (p-pol: $\\vec E$ i innfallsplanet).'],
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
     <canvas id="fresnelCanvas" height="300" role="img" aria-label="Interaktiv graf av Fresnel-reflektans mot innfallsvinkel som oppdateres med brytningsindeksene nedenfor."></canvas>
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
      ['$\\sin\\theta_c=\\dfrac{n_2}{n_1}$','Kritisk vinkel (tett→tynt, $n_1>n_2$).', true],
      ['$|r|=1$ for $\\theta>\\theta_c$','Total intern refleksjon, kompleks $r$ (faseforskyvning).', true],
      ['$E(z)\\propto e^{-z/d}$','Evanescent bølge, eksponentielt avtagende. $z$ = dybde inn i det tynne mediet, $d$ = inntrengningsdybde.', true],
      ['$\\theta_\\text{regn}\\approx 42^\\circ\\,(1°),\\,51^\\circ\\,(2°)$','Primær- og sekundærbue.', true]
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
      ['$I_\\text{tot}=4I_0\\cos^2\\!\\big(\\tfrac{\\pi a\\sin\\theta}{\\lambda}\\big)$','Youngs intensitetsmønster. $a$ = spalteavstand (senter til senter).'],
      ['$\\Delta y=\\dfrac{\\lambda L}{a}$','Stripeavstand på skjermen. $L$ = skjermavstand, $a$ = spalteavstand.'],
      ['$N=\\dfrac{(n-1)t}{\\lambda}$','Stripeforskyvning fra glassplate over én spalt. $t$ = platetykkelse, $N$ = antall striper mønsteret forskyves.', true]
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
     <canvas id="youngCanvas" height="220" role="img" aria-label="Interaktivt Youngs interferensmønster som oppdateres når du justerer spalteavstand og bølgelengde nedenfor."></canvas>
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
      ['$l_c=\\dfrac{\\lambda_0^2}{\\Delta\\lambda}=\\dfrac{c}{\\Delta f}$','Temporal koherenslengde. $\\Delta\\lambda$ = kildens spektralbredde.'],
      ['$l_s<\\dfrac{1{,}22\\lambda}{\\theta}$','Spatial koherenslengde (sirkulær apertur). $\\theta$ = kildens vinkelutstrekning.'],
      ['$I=4I_0\\cos^2(\\delta/2),\\ \\Delta p=2d\\cos\\theta$','Michelson-interferometer. $\\delta$ = faseforskjell mellom armene, $\\Delta p$ = veiforskjell, $d$ = speilforskyvning.'],
      ['$V=\\dfrac{I_\\text{max}-I_\\text{min}}{I_\\text{max}+I_\\text{min}}$','Synlighet (visibility).'],
      ['$\\Delta=2n_f t\\cos\\theta_t$','Tynnfilm: optisk veiforskjell. $n_f$ = filmens brytningsindeks, $t$ = filmtykkelse, $\\theta_t$ = brytningsvinkel i filmen.']
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
    'Forklare lysføring via total intern refleksjon, akseptansekjegle, <strong>numerisk apertur</strong> og kritisk vinkel.',
    'Regne <strong>skip-avstand</strong>, <strong>modetall</strong> og betingelsen for <strong>singelmodus</strong>; forstå step-index vs. GRIN.',
    'Beskrive <strong>dempning</strong> (dB/km, Beers lov, telekomvinduer, EDFA) og hva som forårsaker tap.',
    'Skille de fire <strong>dispersjonstypene</strong> (modal, material, bølgeleder, polarisasjonsmodus) og koble dem til <strong>båndbredde–avstand-produktet</strong>.',
    'Kjenne fiberkomponentene: koblere, isolatorer, sirkulatorer, <strong>fiber-Bragg-gitter</strong>, WDM/DWDM og <strong>Mach–Zehnder</strong>-mux/demux.'
  ])
  + `<div class="card"><h3><span class="dot"></span>Kjernen i temaet</h3>
     <p class="lede">En optisk fiber er en kjerne ($n_1$) omgitt av en kappe ($n_2<n_1$). Lys som treffer kjerne–kappe-grensen brattere enn kritisk vinkel føres ved gjentatt total intern refleksjon. Mesteparten av kapittelet kan forstås med <strong>strålemodellen</strong> (meridionale stråler), med interferens lagt til der det trengs.</p>
     <h4>To fibertyper</h4>
     <ul>
       <li><strong>Step-index</strong>: skarp indeksovergang kjerne→kappe. Enkel, men mest modal dispersjon.</li>
       <li><strong>Graded-index (GRIN)</strong>: indeksen avtar gradvis utover; strålene bøyes kontinuerlig (mirage-effekt) og får nesten lik gangtid ⇒ mye mindre modal dispersjon.</li>
     </ul>
     <p>Kappens andre oppgave er å hindre <strong>frustrert TIR</strong> (lekkasje/«cross talk») mellom nabofibre.</p>
     </div>`
  + `<div class="card"><h3><span class="dot"></span>Akseptansekjegle, NA & skip-avstand</h3>
     <p>Bare lys innenfor en <strong>akseptansekjegle</strong> (halvvinkel $\\theta_\\text{max}$) treffer kjerne–kappe-grensen brattere enn kritisk vinkel og føres videre. Snells lov ved endeflaten gir den <strong>numeriske aperturen</strong>:</p>
     <p>$NA=n_0\\sin\\theta_\\text{max}=n_1\\cos\\phi_c=\\sqrt{n_1^2-n_2^2}$.</p>
     <p>Stor $NA$ ⇒ lett innkobling, men flere moder. En glass/luft-fiber kan ikke ha $NA>1$. <strong>Skip-avstanden</strong> $L_s$ er avstanden mellom to refleksjoner; en typisk fiber har tusenvis av refleksjoner per meter, så hver flate må være nesten tapsfri.</p>
     </div>`
  + formulas([
      ['$\\sin\\phi_c=\\dfrac{n_2}{n_1}$','Kritisk vinkel ved kjerne–kappe. $\\phi_c$ måles fra <strong>grenseflaten</strong> (ikke normalen).', true],
      ['$NA=n_0\\sin\\theta_\\text{max}=\\sqrt{n_1^2-n_2^2}$','Numerisk apertur / akseptansevinkel.', true],
      ['$L_s=\\dfrac{d}{\\tan\\theta\'}=d\\sqrt{\\left(\\dfrac{n_1}{n_0\\sin\\theta}\\right)^2-1}$','Skip-avstand mellom refleksjoner ($d$ = kjernediameter).', true]
    ])
  + `<div class="card"><h3><span class="dot"></span>Moder: multimodus, singelmodus & GRIN</h3>
     <p>Bare visse strålevinkler tilfredsstiller en <strong>resonansbetingelse</strong> (faseforskjellen rundt etter to refleksjoner er et helt antall $2\\pi$) og overlever som <strong>moder</strong>. Hver mode har to polarisasjoner (TE/TM).</p>
     <p>Antall moder vokser som $(d/\\lambda)^2$ og med $NA^2$. Store kjerner ⇒ <strong>multimodus</strong>; en liten nok kjerne slipper bare gjennom den aksiale «rett-fram»-moden ⇒ <strong>singelmodus</strong> (best båndbredde, men vanskeligst å koble til).</p>
     </div>`
  + formulas([
      ['$m_{x,\\text{max}}\\cong\\dfrac{2d}{\\lambda}\\,NA$','Høyeste modetall (slab-tilnærming).', true],
      ['$N_\\text{moder}\\approx 4\\left(\\dfrac{d\\,NA}{\\lambda}\\right)^2$','Totalt antall moder, sylindrisk fiber.', true],
      ['$d<\\dfrac{2{,}4\\,\\lambda}{\\pi\\,NA}$','Singelmodus-betingelse (kjernediameter).', true]
    ])
  + `<div class="card"><h3><span class="dot"></span>Dempning, regenerering & EDFA</h3>
     <p>Lys i en fiber dempes alltid. <strong>Ekstrinsiske tap</strong>: skarpe bend, mikrobend, dårlig innkobling, skjøter. <strong>Intrinsiske tap</strong>: absorpsjon i silika (UV + IR) og <strong>Rayleigh-spredning</strong> ($\\propto1/\\lambda^4$, derfor færre tap ved lange bølgelengder).</p>
     <p>Minimum dempning i silika ligger nær <strong>1,55&nbsp;µm</strong> (3. telekomvindu, $\\sim0{,}15$ dB/km), med et lokalt minimum ved 1,3&nbsp;µm (2. vindu) der materialdispersjonen er null. Båndene heter O, E, S, <strong>C (1530–1565 nm)</strong>, L, U; C-båndet brukes mest til langdistanse.</p>
     <p>Tap rettes opp med <strong>erbium-dopede fiberforsterkere (EDFA)</strong>, pumpet ved ~980 nm, som forsterker hele C-båndet ved stimulert emisjon — og fjernet behovet for elektrisk OEO-regenerering.</p>
     </div>`
  + formulas([
      ['$I_L=I_0e^{-\\alpha L},\\quad \\alpha=\\dfrac{1}{L}\\ln\\dfrac{I_0}{I_L}$','Beers lov (dempningskoeffisient).', true],
      ['$\\alpha_\\text{dB}=10\\log_{10}\\dfrac{P_\\text{inn}}{P_\\text{ut}}=\\dfrac{10}{\\ln 10}\\,\\alpha$','Dempning i dB/km (over 1 km).', true]
    ])
  + `<div class="card"><h3><span class="dot"></span>Pulsutsmøring (dispersjon)</h3>
     <p>I tillegg til dempning forvrenges pulsene — de smøres ut i tid og kan overlappe nabopulser (<strong>inter-symbol-interferens</strong>), noe som begrenser bitraten. I synkende rekkefølge etter alvorlighetsgrad:</p>
     <ul>
       <li><strong>Modal dispersjon</strong>: ulike moder har ulik gangtid. Verst i multimodus step-index; fjernes i singelmodus, og reduseres ~$\\Delta_n/2$ i parabolisk GRIN.</li>
       <li><strong>Materialdispersjon</strong>: $n(\\lambda)$ varierer ⇒ ulike bølgelengder reiser ulikt fort. Skaleres med kildens spektralbredde $\\Delta\\lambda$ via materialdispersjonsparameteren $M$. Null nær 1,27&nbsp;µm.</li>
       <li><strong>Bølgelederdispersjon</strong>: samme mode følger litt ulik vei for ulike $\\lambda$ ($\\delta\\tau/L=-M'\\Delta\\lambda$). Liten, men flytter null-dispersjon mot 1,31&nbsp;µm.</li>
       <li><strong>Polarisasjonsmodedispersjon</strong>: dobbeltbrytning gir ulik fart for de to polarisasjonene. Minst, men begrensende ved &gt;10 Gbps.</li>
     </ul>
     <p>Pulsutsmøringen per lengde gir <strong>båndbredde–avstand-produktet</strong> $\\nu_\\text{max}L$ — fiberens nøkkeltall (kobber: bare ~10–25 MHz·km).</p>
     </div>`
  + formulas([
      ['$\\left(\\dfrac{\\delta\\tau}{L}\\right)_\\text{step}=\\dfrac{n_1}{c}\\dfrac{n_1-n_2}{n_2}$','Modal dispersjon, step-index. $\\delta\\tau/L$ = pulsutsmøring per lengde.', true],
      ['$\\left(\\dfrac{\\delta\\tau}{L}\\right)_\\text{GRIN}\\approx\\dfrac{n_1}{2c}\\Delta_n^{2}$','Modal dispersjon, parabolisk GRIN ($\\Delta_n\\approx\\tfrac{n_1-n_2}{n_1}$).', true],
      ['$\\dfrac{\\delta\\tau}{L}=-M\\,\\Delta\\lambda$','Materialdispersjon ($M$ i ps/(nm·km)).', true],
      ['$\\nu_\\text{max}L=\\dfrac{0{,}5}{(\\delta\\tau/L)}$','Båndbredde–avstand-produkt.', true]
    ])
  + `<div class="card"><h3><span class="dot"></span>Fiberkomponenter & WDM</h3>
     <ul>
       <li><strong>Koblere</strong> (sammensmeltede kjerner): splitter/kombinerer signaler. Like utganger ⇒ <strong>3 dB-kobler</strong>.</li>
       <li><strong>Optiske isolatorer</strong>: «optiske dioder» (Faraday-rotator) som slipper lys bare én vei.</li>
       <li><strong>Sirkulatorer</strong>: ikke-resiproke 3-/4-ports-enheter som legger til/tar ut kanaler.</li>
       <li><strong>Fiber-Bragg-gitter (FBG)</strong>: indeksmodulasjon (periode $\\Lambda\\sim1$&nbsp;µm) som virker som et bølgelengdespesifikt speil; reflekterer $\\lambda_B=2n_1\\Lambda$. <em>Chirpet</em> FBG + sirkulator kompenserer kromatisk dispersjon.</li>
       <li><strong>WDM/DWDM</strong>: flere bærebølgelengder samtidig i én fiber. EDFA-forsterkning over ~35 nm rommer ~45 kanaler à 0,8 nm (100 GHz) i C-båndet.</li>
       <li><strong>Mach–Zehnder fiberinterferometer</strong>: brukes som mux/demux. Veiforskjell $\\Delta L$ velges så én bærebølgelengde gir konstruktiv ($m\\lambda_1$) og en annen destruktiv ($(m+\\tfrac12)\\lambda_2$) interferens på hver utgang.</li>
     </ul>
     </div>`
  + formulas([
      ['$\\lambda_B=2n_1\\Lambda$','Fiber-Bragg-gitter: reflektert bølgelengde. $\\Lambda$ = gitterets periode.', true],
      ['$\\Delta L=\\dfrac{m\\lambda_1}{n}=\\dfrac{(m+\\tfrac12)\\lambda_2}{n}$','Mach–Zehnder to-kanals demux (begge må gjelde).', true],
      ['$\\mathcal R\\approx\\dfrac{500}{d\\,[\\mu\\text{m}]}$','Spatial oppløsning til fiberbunt (lin/mm).', true]
    ])
  + exam(['NA & akseptansevinkel','Modetall / singelmodus','Dempning (dB/km)','Dispersjon & båndbredde','Mach–Zehnder demux','Fiber-Bragg-gitter'],
      `<p>Selvstudium-modul, men kapittelet har mange regneoppgaver. Typiske former: gitt $n_1,n_2$ → finn $NA$, $\\theta_\\text{max}$, $\\phi_c$ og skip-avstand; finn maks kjernediameter for singelmodus eller antall moder for en multimodus-fiber; regn dempning i dB/km fra inn-/uteffekt; estimer modal/materialdispersjon og dermed båndbredde–avstand-produktet; og løs et Mach–Zehnder-demux-problem for veiforskjellen $\\Delta L$ som skiller to bølgelengder.</p>`)
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 1 — NA, akseptanse & kritisk vinkel</h3>
     <div class="prob">En fiber har kjerne $n_1=1{,}48$ og kappe $n_2=1{,}46$. Finn numerisk apertur, maksimal akseptansevinkel fra luft, og kritisk vinkel ved kjerne–kappe-grensen.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">NA</span><p>$NA=\\sqrt{1{,}48^2-1{,}46^2}=\\sqrt{2{,}1904-2{,}1316}=\\sqrt{0{,}0588}=0{,}242$.</p></div>
        <div class="step"><span class="lbl">Akseptanse</span><p>$\\theta_\\text{max}=\\arcsin(NA/n_0)=\\arcsin(0{,}242)\\approx 14{,}0^\\circ$.</p></div>
        <div class="step"><span class="lbl">Kritisk vinkel</span><p>$\\phi_c=\\arcsin(n_2/n_1)=\\arcsin(0{,}9865)\\approx 80{,}6^\\circ$.</p></div>
        <span class="answer">NA ≈ 0,242; θ_max ≈ 14°; φ_c ≈ 80,6°</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 2 — singelmodus & modetall</h3>
     <div class="prob">En fiber har kjerne $n_1=1{,}465$ og kappe $n_2=1{,}460$ ved $\\lambda=1{,}25$&nbsp;µm. Finn maks kjernediameter for singelmodus, og antall moder hvis diameteren i stedet er $50$&nbsp;µm.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">NA</span><p>$NA=\\sqrt{1{,}465^2-1{,}460^2}=\\sqrt{0{,}01463}=0{,}121$.</p></div>
        <div class="step"><span class="lbl">Singelmodus</span><p>$d<\\dfrac{2{,}4\\lambda}{\\pi NA}=\\dfrac{2{,}4(1{,}25\\,\\mu m)}{\\pi(0{,}121)}\\approx 7{,}9\\,\\mu m$.</p></div>
        <div class="step"><span class="lbl">Multimodus ($d=50$ µm)</span><p>$N\\approx4\\left(\\dfrac{50\\cdot0{,}121}{1{,}25}\\right)^2\\approx 94$ moder.</p></div>
        <span class="answer">d &lt; 7,9 µm for singelmodus; ellers ≈ 94 moder</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 3 — dempning i dB/km</h3>
     <div class="prob">Et signal har effekt $5\\,\\mu$W rett innenfor inngangen til en $100$&nbsp;m lang plastfiber, og bare $1\\,\\mu$W ved utgangen. Hva er dempningskoeffisienten i dB/km?</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Formel</span><p>$\\alpha_\\text{dB}=\\dfrac{10}{L_\\text{km}}\\log_{10}\\dfrac{P_\\text{inn}}{P_\\text{ut}}$ med $L_\\text{km}=0{,}1$.</p></div>
        <div class="step"><span class="lbl">Innsetting</span><p>$\\alpha_\\text{dB}=\\dfrac{10}{0{,}1}\\log_{10}\\dfrac{5}{1}=100\\cdot0{,}699\\approx 69{,}9$ dB/km.</p></div>
        <div class="step"><p>Til sammenligning har singelmodus glassfiber ved 1,55&nbsp;µm bare ~0,15 dB/km.</p></div>
        <span class="answer">α ≈ 70 dB/km (plastfiber er svært tapsrik)</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 4 — modal dispersjon & båndbredde</h3>
     <div class="prob">En multimodus step-index fiber har $n_1=1{,}46$ og $n_2=1{,}45$. Estimer pulsutsmøring per km og båndbredde–avstand-produktet.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Modal dispersjon</span><p>$\\dfrac{\\delta\\tau}{L}=\\dfrac{n_1}{c}\\dfrac{n_1-n_2}{n_2}=\\dfrac{1{,}46}{3\\times10^8}\\cdot\\dfrac{0{,}01}{1{,}45}\\approx 3{,}4\\times10^{-11}$ s/m $=34$ ns/km.</p></div>
        <div class="step"><span class="lbl">Båndbredde</span><p>$\\nu_\\text{max}L=\\dfrac{0{,}5}{34\\text{ ns/km}}\\approx 1{,}5\\times10^{7}\\text{ Hz·km}=15$ MHz·km.</p></div>
        <div class="step"><p>Derfor er multimodus step-index uegnet til langdistanse — singelmodus eller GRIN trengs.</p></div>
        <span class="answer">δτ/L ≈ 34 ns/km; ν_max·L ≈ 15 MHz·km</span>`)}
     </div>`
  + `<div class="card worked"><h3><span class="dot"></span>Regneeksempel 5 — Mach–Zehnder demux</h3>
     <div class="prob">Et Mach–Zehnder fiberinterferometer ($n=1{,}500$) skal demultiplekse $\\lambda_1=1551$&nbsp;nm og $\\lambda_2=1550$&nbsp;nm. Finn veiforskjellen $\\Delta L$.</div>
     ${reveal('Vis løsning',
       `<div class="step"><span class="lbl">Betingelser</span><p>$\\Delta L=\\dfrac{m\\lambda_1}{n}$ (konstruktiv for $\\lambda_1$) og $\\Delta L=\\dfrac{(m+\\tfrac12)\\lambda_2}{n}$ (destruktiv for $\\lambda_2$).</p></div>
        <div class="step"><span class="lbl">Løs for $\\Delta L$</span><p>$\\Delta L=\\dfrac{1}{2n}\\left(\\dfrac{1}{\\lambda_2}-\\dfrac{1}{\\lambda_1}\\right)^{-1}=\\dfrac{1}{2(1{,}5)}\\left(\\dfrac{1}{1550}-\\dfrac{1}{1551}\\right)^{-1}\\text{nm}$.</p></div>
        <div class="step"><p>$\\approx 801{,}000$ nm $=0{,}801$ mm. (Sjekk: $m=n\\Delta L/\\lambda_1\\approx775$, et heltall ✓.)</p></div>
        <span class="answer">ΔL ≈ 0,801 mm</span>`)}
     </div>`
  + quizCard('Sjekk deg selv', [
      {n:'1', q:'Lys føres i en fiber takket være:',
       opts:['diffraksjon','total intern refleksjon i kjerne–kappe','brytning ved Brewster','absorpsjon'],
       answer:1, ex:'Kjernen har høyere indeks enn kappen, så TIR holder lyset inne så lenge $\\phi>\\phi_c$.'},
      {n:'2', q:'Singelmodus-fiber har høyere båndbredde fordi den fjerner:',
       opts:['materialdispersjon','modal dispersjon','numerisk apertur','absorpsjon'],
       answer:1, ex:'Med kun én mode forsvinner forskjellen i gangtid mellom moder ⇒ mindre pulsutsmøring.'},
      {n:'3', q:'Minimum dempning i en silikafiber ligger nær:',
       opts:['400 nm','800 nm','1,55 µm','10 µm'],
       answer:2, ex:'Rayleigh-spredning ($\\propto1/\\lambda^4$) og IR-absorpsjon møtes i et minimum nær 1,55 µm — 3. telekomvindu.'},
      {n:'4', q:'Rayleigh-spredning i fiberen avtar med bølgelengde som:',
       opts:['$1/\\lambda$','$1/\\lambda^2$','$1/\\lambda^4$','uavhengig av $\\lambda$'],
       answer:2, ex:'Spredningstverrsnittet går som $1/\\lambda^4$, derfor velges lange bølgelengder.'},
      {n:'5', q:'En EDFA brukes til å:',
       opts:['splitte signalet i kanaler','forsterke signalet optisk (stimulert emisjon)','måle dispersjon','polarisere lyset'],
       answer:1, ex:'Erbium-dopet fiber pumpet ved ~980 nm forsterker C-båndet direkte, uten OEO-konvertering.'},
      {n:'6', q:'Et fiber-Bragg-gitter virker som:',
       opts:['et bølgelengdespesifikt speil ($\\lambda_B=2n_1\\Lambda$)','en bredbåndsforsterker','en polarisator','en lyskilde'],
       answer:0, ex:'Periodisk indeksmodulasjon gir sterk refleksjon når Bragg-betingelsen $\\lambda_B=2n_1\\Lambda$ er oppfylt.'}
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
      ['$I=I_0\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2,\\ \\beta=\\dfrac{\\pi b\\sin\\theta}{\\lambda}$','Enkeltspalt-intensitet. $b$ = spaltbredde (ikke spalteavstand $a$).'],
      ['$b\\sin\\theta_m=m\\lambda$','Minima for enkeltspalt (utledbar fra $\\sin\\beta=0$).', true],
      ['$\\Delta\\theta_{1/2}=\\dfrac{1{,}22\\lambda}{D}\\approx\\dfrac{\\Delta x}{L}$','Airy-skive / Rayleigh-kriteriet. $D$ = aperturdiameter, $\\Delta x$ = spotradius, $L$ = avstand.'],
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
     <canvas id="diffCanvas" height="240" role="img" aria-label="Interaktivt diffraksjonsmønster for enkelt- og flerspalt som oppdateres med kontrollene nedenfor."></canvas>
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
      ['$m\\lambda=a(\\sin\\theta_i+\\sin\\theta_m)$','Gitterlikningen. $a$ = spalteavstand (gitterkonstant), $\\theta_i$ = innfalls-, $\\theta_m$ = utfallsvinkel for orden $m$.'],
      ['$\\mathcal R=\\dfrac{\\lambda}{\\Delta\\lambda}=mN$','Spektral oppløsning $\\mathcal R$ = evnen til å skille to nære bølgelengder; $N$ = antall belyste spalter.'],
      ['$\\mathcal D=\\dfrac{d\\theta_m}{d\\lambda}=\\dfrac{m}{a\\cos\\theta_m}$','Vinkeldispersjon $\\mathcal D$ = hvor mye utfallsvinkelen endrer seg per bølgelengde.'],
      ['$\\lambda_\\text{fsr}=\\dfrac{\\lambda_1}{m}$','Fritt spektralområde: bølgelengdeintervallet før naboordener (orden $m$) overlapper.']
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

const EXTRAS = {
  foton: {
    explainTitle:'Mer forklaring — energi, effekt og fotonfluks',
    explain:`<p>Eksamen blander ofte størrelser som ser like ut, men som har ulik fysisk betydning. <strong>Energi per foton</strong> er bestemt av bølgelengden alene, mens <strong>effekt</strong> forteller hvor mange fotoner som kommer per sekund.</p>
      <p>En god arbeidsregel er: finn først $E_\\text{foton}=hc/\\lambda$. Deretter kan du koble til makroskopiske størrelser med $P=N E_\\text{foton}/t$. Hvis oppgaven gir areal, går du videre til irradians $E_e=P/A$.</p>`,
    workedTitle:'Regneeksempel — fotonfluks fra laser',
    problem:'En grønn laser har effekt $P=2{,}0\\text{ mW}$ og bølgelengde $\\lambda=532\\text{ nm}$. Hvor mange fotoner sendes ut per sekund?',
    solution:`<div class="step"><span class="lbl">Fotonenergi</span><p>$E=hc/\\lambda=(6{,}63\\times10^{-34})(3{,}00\\times10^8)/(532\\times10^{-9})=3{,}74\\times10^{-19}\\text{ J}$.</p></div>
      <div class="step"><span class="lbl">Antall per sekund</span><p>Effekt er energi per tid: $N/t=P/E=(2{,}0\\times10^{-3})/(3{,}74\\times10^{-19})=5{,}35\\times10^{15}\\text{ s}^{-1}$.</p></div>`,
    answer:'≈ 5,3×10¹⁵ fotoner/s',
    questions:[
      {n:'3', q:'En lyskilde har samme effekt ved 400 nm og 800 nm. Hvilken stråle har flest fotoner per sekund?',
       opts:['400 nm','800 nm','like mange','det avhenger bare av arealet'],
       answer:1, ex:'Ved lengre bølgelengde er hvert foton mindre energirikt. Samme effekt betyr derfor flere fotoner per sekund ved 800 nm.'},
      {n:'4', q:'Irradians måles i:',
       opts:['J','W','W/m²','sr'],
       answer:2, ex:'Irradians er effekt per areal på en flate, altså watt per kvadratmeter.'}
    ]
  },
  geo1: {
    explainTitle:'Mer forklaring — fortegn før tall',
    explain:`<p>I linseoppgaver er feil fortegn vanligere enn feil algebra. Start derfor med en skisse: hvor er objektet, hvor forventer du bildet, og er linsen samlende eller spredende?</p>
      <p>For en positiv linse med objekt utenfor brennvidden forventer du et reelt bilde på motsatt side: $s_i>0$ og $m<0$. Hvis regningen gir noe annet, bør du kontrollere fortegnene før du går videre.</p>`,
    workedTitle:'Regneeksempel — bildeplassering og forstørrelse',
    problem:'Et objekt står $30\\text{ cm}$ foran en positiv linse med $f=10\\text{ cm}$. Finn bildeavstand, forstørrelse og bildetype.',
    solution:`<div class="step"><span class="lbl">Linseformel</span><p>$1/s_i=1/f-1/s_o=1/10-1/30=2/30=1/15$.</p></div>
      <div class="step"><span class="lbl">Tolkning</span><p>$s_i=15\\text{ cm}>0$, så bildet er reelt og ligger på andre siden av linsen. $m=-s_i/s_o=-15/30=-0{,}50$, altså invertert og halv størrelse.</p></div>`,
    answer:'sᵢ = 15 cm, m = −0,50, reelt og invertert',
    questions:[
      {n:'3', q:'Et positivt $s_i$ i tynnlinseformelen betyr vanligvis:',
       opts:['virtuelt bilde på objektsiden','reelt bilde på bildesiden','ingen avbildning','negativ forstørrelse automatisk større enn 1'],
       answer:1, ex:'Med standard fortegn ligger et positivt bildepunkt på utgangssiden av linsen og er reelt.'},
      {n:'4', q:'Hvis $s_o=f$ for en positiv linse, blir bildet:',
       opts:['ved $f$ på bildesiden','ved $2f$','i uendelig','virtuelt og opprett ved $f/2$'],
       answer:2, ex:'Da blir $1/s_i=1/f-1/f=0$, altså $s_i\\to\\infty$.'}
    ]
  },
  geo2: {
    explainTitle:'Mer forklaring — hva matrisen egentlig gjør',
    explain:`<p>Ray-transfer-metoden er mest nyttig når du bruker matriseelementene som diagnostikk. $B=0$ betyr at utgangshøyden ikke avhenger av inngangsvinkelen; alle stråler fra samme objektpunkt møtes i bildeplanet.</p>
      <p>For et system i samme medium bør determinanten være 1. Det er en enkel kvalitetskontroll etter matrisemultiplikasjon.</p>`,
    workedTitle:'Regneeksempel — finn bildeplanet med $B=0$',
    problem:'Et objekt står $s_o=30\\text{ cm}$ foran en tynn linse med $f=10\\text{ cm}$. Bruk matriseideen til å finne avstanden $d$ fra linsen til bildeplanet.',
    solution:`<div class="step"><span class="lbl">System</span><p>Fra objektplan til bildeplan: $M=T(d)L(f)T(s_o)$. Bildeplan krever $B=0$.</p></div>
      <div class="step"><span class="lbl">Resultat</span><p>Multiplikasjon gir $B=s_o+d-ds_o/f$. Sett $B=0$: $30+d-3d=0\\Rightarrow d=15\\text{ cm}$.</p></div>`,
    answer:'d = 15 cm',
    questions:[
      {n:'3', q:'Hva er en rask kontroll for et system som starter og slutter i samme medium?',
       opts:['$A=0$','$B=1$','$\\det M=1$','$C=D$'],
       answer:2, ex:'For tapsfri paraxial stråleoptikk i samme medium er determinanten 1.'},
      {n:'4', q:'Et afokalt system kjennetegnes ved:',
       opts:['$B=0$','$C=0$','$A=0$','$D=0$'],
       answer:1, ex:'$C=0$ gjør at parallelle inngående stråler fortsatt er parallelle ut.'}
    ]
  },
  raytracing: {
    explainTitle:'Mer forklaring — effektiv f vs. bakre brennavstand',
    explain:`<p>Effektiv brennvidde $f=-1/C$ måles fra <em>hovedplanet</em>, ikke fra glasset. Bakre brennavstand (BFD) $=-A/C$ måles fra <em>utgangsplanet</em> (siste flate). For en tykk linse eller et sammensatt system faller disse ikke sammen — derfor finnes hovedplan og kardinalpunkter.</p>
      <p>Når en oppgave spør «hvor må skjermen stå for et fjernt objekt», spør den om BFD ($-A/C$), ikke om $f$.</p>`,
    workedTitle:'Regneeksempel — tolk en gitt systemmatrise',
    problem:'Et system i luft har $M=\\begin{pmatrix}0{,}5 & -3\\text{ cm}\\\\ -0{,}1\\text{ cm}^{-1} & 2{,}6\\end{pmatrix}$. (a) Er den gyldig? (b) Effektiv brennvidde? (c) Hvor fokuserer et fjernt objekt bak utgangsplanet?',
    solution:`<div class="step"><span class="lbl">Determinant</span><p>$\\det M=0{,}5\\cdot2{,}6-(-3)(-0{,}1)=1{,}3-0{,}3=1$ ✓ — gyldig (luft→luft).</p></div>
      <div class="step"><span class="lbl">Effektiv f</span><p>$f=-1/C=-1/(-0{,}1)=10\\text{ cm}$.</p></div>
      <div class="step"><span class="lbl">Fjernt objekt</span><p>Parallelt inn ($\\alpha_1=0$): $y_2=Ay_1,\\ \\alpha_2=Cy_1$. Fokus der høyden blir null: $x=-A/C=-0{,}5/(-0{,}1)=5\\text{ cm}$ bak utgangsplanet (BFD).</p></div>`,
    answer:'det = 1 ✓, f = 10 cm, skjerm 5 cm bak utgangsplanet',
    questions:[
      {n:'7', q:'Hvorfor er bakre brennavstand mindre enn effektiv brennvidde her?',
       opts:['fordi $A<1$ flytter hovedplanet bak utgangsplanet','fordi lyset taper energi','fordi $\\det M\\neq1$','rent tilfeldig'],
       answer:0, ex:'Hovedplanet ligger foran utgangsplanet, så avstanden fra glasset (BFD) blir kortere enn $f$ målt fra hovedplanet.'},
      {n:'8', q:'Et fjernt objekt avbildes alltid i …',
       opts:['hovedplanet','brennplanet','utgangsplanet','uendelig'],
       answer:1, ex:'Parallelle stråler fra uendelig samles i det bakre brennplanet.'}
    ]
  },
  geo3: {
    explainTitle:'Mer forklaring — vinkelforstørrelse er ikke bildestørrelse',
    explain:`<p>Instrumentoppgaver handler ofte om vinkler, ikke bare centimeter på et mellomliggende bilde. En lupe eller et teleskop hjelper fordi objektet dekker større vinkel på øyet.</p>
      <p>For teleskop er fortegnet i $MP=-f_o/f_e$ en orienteringsmarkør: negativt betyr invertert bilde. Størrelsen $|MP|$ er vanligvis det oppgaven mener når den spør om «forstørrelse».</p>`,
    workedTitle:'Regneeksempel — teleskoplengde og forstørrelse',
    problem:'Et Kepler-teleskop har objektiv $f_o=80\\text{ cm}$ og okular $f_e=4\\text{ cm}$. Finn rørlengden i afokal oppstilling og vinkelforstørrelsen.',
    solution:`<div class="step"><span class="lbl">Afokal avstand</span><p>For to positive linser er avstanden $d=f_o+f_e=84\\text{ cm}$.</p></div>
      <div class="step"><span class="lbl">Forstørrelse</span><p>$MP=-f_o/f_e=-80/4=-20$. Bildet er invertert, og vinkelstørrelsen er 20 ganger større.</p></div>`,
    answer:'d = 84 cm, MP = −20',
    questions:[
      {n:'3', q:'Hvorfor er et Kepler-teleskop afokalt når linseavstanden er $f_o+f_e$?',
       opts:['fordi bildet ligger på objektivet','fordi felles brennplan deles','fordi okularet blir negativt','fordi $B=0$ alltid'],
       answer:1, ex:'Objektivets bildeplan faller sammen med okularets fremre brennplan, så parallelt lys kommer parallelt ut.'},
      {n:'4', q:'Et større f-tall i kamera betyr vanligvis:',
       opts:['større apertur','mindre apertur','kortere brennvidde uansett','ingen endring i lysmengde'],
       answer:1, ex:'$f\\#=f/D$. For gitt brennvidde gir større f-tall mindre aperturdiameter.'}
    ]
  },
  wave1: {
    explainTitle:'Mer forklaring — les bølgeuttrykket systematisk',
    explain:`<p>Et uttrykk som $E_0\\cos(kz-\\omega t)$ gir tre ting samtidig: amplituden $E_0$, utbredelsesretningen fra fortegnet foran $\\omega t$, og bølgelengden fra $k$.</p>
      <p>Husk også at intensitet går som amplitude i andre potens. Dobler du $E_0$, firedobles intensiteten.</p>`,
    workedTitle:'Regneeksempel — intensitet fra feltamplitude',
    problem:'En plan bølge i luft har elektrisk feltamplitude $E_0=100\\text{ V/m}$. Estimer tidsmidlet intensitet.',
    solution:`<div class="step"><span class="lbl">Formel</span><p>Bruk $I=\\tfrac12 c\\varepsilon_0E_0^2$ for luft/vakuum.</p></div>
      <div class="step"><span class="lbl">Innsetting</span><p>$I=0{,}5(3{,}00\\times10^8)(8{,}85\\times10^{-12})(100)^2=13{,}3\\text{ W/m}^2$.</p></div>`,
    answer:'I ≈ 13 W/m²',
    questions:[
      {n:'3', q:'Hvis $E_0$ dobles, endres intensiteten med faktor:',
       opts:['2','4','1/2','8'],
       answer:1, ex:'Intensitet er proporsjonal med $E_0^2$.'},
      {n:'4', q:'I $\\cos(kz-\\omega t)$ beveger bølgen seg:',
       opts:['langs +z','langs −z','langs +x','står stille'],
       answer:0, ex:'Konstant fase krever $kz-\\omega t=\\text{konstant}$, altså øker z når t øker.'}
    ]
  },
  wave2: {
    explainTitle:'Mer forklaring — TE/TM uten pugging',
    explain:`<p>TE og TM er definert relativt til innfallsplanet, ikke relativt til bordet eller skjermen. Tegn innfallsplanet først: det spennes ut av innkommende stråle og normalen.</p>
      <p>TE betyr at E-feltet står vinkelrett på dette planet. TM betyr at E-feltet ligger i planet. Ved Brewster forsvinner TM-refleksjonen, derfor blir reflektert lys rent TE.</p>`,
    workedTitle:'Regneeksempel — normalrefleksjon ved glass',
    problem:'Lys går normalt fra luft til glass med $n=1{,}50$. Finn reflektansen ved flaten.',
    solution:`<div class="step"><span class="lbl">Normal innfall</span><p>$R=\\left((n_1-n_2)/(n_1+n_2)\\right)^2$.</p></div>
      <div class="step"><span class="lbl">Innsetting</span><p>$R=((1{,}00-1{,}50)/(1{,}00+1{,}50))^2=(-0{,}20)^2=0{,}040$.</p></div>`,
    answer:'R = 4,0 %',
    questions:[
      {n:'3', q:'Ved Brewster-vinkelen for luft→glass er hvilken komponent null i refleksjon?',
       opts:['TE','TM','begge','ingen'],
       answer:1, ex:'Brewster-betingelsen er $r_{TM}=0$.'},
      {n:'4', q:'Innfallsplanet bestemmes av:',
       opts:['E-feltet alene','B-feltet alene','innkommende stråle og normalen','overflaten alene'],
       answer:2, ex:'Innfallsplanet er planet som inneholder stråleretningen og normalen til flaten.'}
    ]
  },
  wave3: {
    explainTitle:'Mer forklaring — TIR betyr ikke null felt utenfor',
    explain:`<p>Total intern refleksjon betyr at netto energitransport inn i medium 2 forsvinner, ikke at feltet er null der. Det evanescente feltet finnes nær grenseflaten og avtar raskt.</p>
      <p>Dette skiller TIR fra en perfekt metallrefleksjon: ved TIR er faseforskyvningen polarisasjonsavhengig, og den kan endre elliptisiteten til polarisert lys.</p>`,
    workedTitle:'Regneeksempel — vann til luft',
    problem:'Lys går fra vann ($n=1{,}33$) til luft. Finn kritisk vinkel og avgjør om $50^\\circ$ gir TIR.',
    solution:`<div class="step"><span class="lbl">Kritisk vinkel</span><p>$\\sin\\theta_c=n_2/n_1=1{,}00/1{,}33=0{,}752$.</p></div>
      <div class="step"><span class="lbl">Sammenligning</span><p>$\\theta_c=48{,}8^\\circ$. Siden $50^\\circ>48{,}8^\\circ$, får vi total intern refleksjon.</p></div>`,
    answer:'θ_c ≈ 48,8°, så 50° gir TIR',
    questions:[
      {n:'3', q:'Hva skjer med reflektansen over kritisk vinkel?',
       opts:['den blir 0','den blir 1','den blir 4 %','den er lik Brewster-vinkelen'],
       answer:1, ex:'Ved TIR er $|r|=1$, så all effekt reflekteres.'},
      {n:'4', q:'Det evanescente feltet:',
       opts:['øker lineært inn i medium 2','avtar eksponentielt','er alltid null','finnes bare i vakuum'],
       answer:1, ex:'Feltamplituden avtar omtrent som $e^{-z/d}$ bort fra grenseflaten.'}
    ]
  },
  wave4: {
    explainTitle:'Mer forklaring — fase er optisk veilengde i forkledning',
    explain:`<p>Interferensoppgaver blir ofte en oversettelse mellom veiforskjell, faseforskjell og intensitet. Bruk $\\Delta\\phi=2\\pi\\Delta/\\lambda$.</p>
      <p>Maksimum krever heltalls bølgelengder i veiforskjell. Minimum krever halv-heltalls bølgelengder. Halv intensitet i et tostråleoppsett ligger midt i fase mellom maksimum og minimum.</p>`,
    workedTitle:'Regneeksempel — fase og intensitet',
    problem:'To like sterke koherente stråler har veiforskjell $\\Delta=\\lambda/3$. Hva blir intensiteten relativt til maksimum?',
    solution:`<div class="step"><span class="lbl">Fase</span><p>$\\Delta\\phi=2\\pi(\\Delta/\\lambda)=2\\pi/3$.</p></div>
      <div class="step"><span class="lbl">Relativ intensitet</span><p>For like amplituder er $I/I_\\text{max}=\\cos^2(\\Delta\\phi/2)=\\cos^2(\\pi/3)=1/4$.</p></div>`,
    answer:'I = 0,25 I_max',
    questions:[
      {n:'3', q:'Veiforskjellen $\\lambda/2$ gir for to like sterke stråler:',
       opts:['maksimum','minimum','halv maksimum','ingen faseforskjell'],
       answer:1, ex:'$\\lambda/2$ tilsvarer faseforskjell $\\pi$, altså destruktiv interferens.'},
      {n:'4', q:'En glassplate foran én spalt øker optisk veilengde med:',
       opts:['$t$','$(n-1)t$','$nt/2$','$\\lambda/t$'],
       answer:1, ex:'Luftveien $t$ erstattes av glassveien $nt$, så økningen er $(n-1)t$.'}
    ]
  },
  wave5: {
    explainTitle:'Mer forklaring — koherens setter kontrasten',
    explain:`<p>Interferensmønsterets synlighet faller når veiforskjellen blir større enn koherenslengden. Derfor kan en Michelson brukes til å måle spektralbredde: du flytter speilet til stripene vaskes ut.</p>
      <p>I Michelson dobles speilforskyvningen som optisk veiforskjell, fordi lyset går fram og tilbake i armen.</p>`,
    workedTitle:'Regneeksempel — telle striper i Michelson',
    problem:'I et Michelson-interferometer brukes $\\lambda=633\\text{ nm}$. Ett speil flyttes $0{,}50\\text{ mm}$. Hvor mange lyse striper passerer?',
    solution:`<div class="step"><span class="lbl">Dobbel vei</span><p>Veiforskjellen endres med $2\\Delta d=1{,}00\\text{ mm}$.</p></div>
      <div class="step"><span class="lbl">Antall striper</span><p>$\\Delta m=2\\Delta d/\\lambda=(1{,}00\\times10^{-3})/(633\\times10^{-9})=1{,}58\\times10^3$.</p></div>`,
    answer:'≈ 1,6×10³ striper',
    questions:[
      {n:'3', q:'Hvorfor brukes faktoren 2 i Michelson når ett speil flyttes?',
       opts:['to polarisasjoner','fram- og tilbakevei','to speil alltid flyttes','fordi intensiteten dobles'],
       answer:1, ex:'Lyset går til speilet og tilbake, så armens optiske vei endres med dobbelt speilforskyvningen.'},
      {n:'4', q:'Lav synlighet $V$ betyr:',
       opts:['stor kontrast','liten forskjell mellom maks og min','ingen bølgelengde','bare TE-polarisering'],
       answer:1, ex:'$V=(I_\\text{max}-I_\\text{min})/(I_\\text{max}+I_\\text{min})$ måler kontrast.'}
    ]
  },
  wave6: {
    explainTitle:'Mer forklaring — GRIN-fiber slår step-index på dispersjon',
    explain:`<p>I en parabolsk GRIN-fiber ($\\alpha_p=2$) avtar indeksen jevnt utover. Aksiale stråler tar korteste vei, men i tregeste (høyeste) indeks; skrå stråler går lengre, men gjennom områder med lavere indeks der farten er høyere. I idealtilfellet blir gangtidene nesten like (isokrone baner).</p>
      <p>Resultatet er at modal dispersjon reduseres med en faktor $\\Delta_n/2$ sammenlignet med en tilsvarende step-index fiber — ofte to–tre størrelsesordener. Materialdispersjon blir da den begrensende effekten.</p>`,
    workedTitle:'Regneeksempel — GRIN vs. step-index modal dispersjon',
    problem:'En fiber har $n_1=1{,}46$ og $n_2=1{,}45$. Sammenlign modal dispersjon for step-index og en parabolsk GRIN-fiber.',
    solution:`<div class="step"><span class="lbl">Step-index</span><p>$\\dfrac{\\delta\\tau}{L}=\\dfrac{n_1}{c}\\dfrac{n_1-n_2}{n_2}\\approx 34$ ns/km (som i Regneeksempel 4).</p></div>
      <div class="step"><span class="lbl">GRIN</span><p>$\\Delta_n=\\dfrac{n_1-n_2}{n_1}=\\dfrac{0{,}01}{1{,}46}=6{,}85\\times10^{-3}$, og reduksjonsfaktoren er $\\Delta_n/2\\approx1/292$.</p></div>
      <div class="step"><p>$\\left(\\dfrac{\\delta\\tau}{L}\\right)_\\text{GRIN}\\approx 34\\text{ ns/km}\\times\\dfrac{1}{292}\\approx 0{,}12$ ns/km.</p></div>`,
    answer:'Step ≈ 34 ns/km; GRIN ≈ 0,12 ns/km (≈ 292× mindre)',
    questions:[
      {n:'7', q:'Hvorfor reduserer en parabolsk GRIN-fiber modal dispersjon?',
       opts:['den har høyere NA','skrå stråler går lengre, men i lavere indeks ⇒ nesten lik gangtid','den fjerner all absorpsjon','den har bare én mode'],
       answer:1, ex:'Den gradvise indeksen gjør banene nær isokrone, så ulike moder ankommer nesten samtidig.'},
      {n:'8', q:'Båndbredde–avstand-produktet $\\nu_\\text{max}L$ forteller:',
       opts:['fiberens dempning','maks bitrate ganger lengde fiberen tåler','kritisk vinkel','antall WDM-kanaler'],
       answer:1, ex:'$\\nu_\\text{max}L=0{,}5/(\\delta\\tau/L)$ — et større produkt betyr høyere bitrate over lengre avstand.'}
    ]
  },
  diff1: {
    explainTitle:'Mer forklaring — minima er ofte enklere enn maksima',
    explain:`<p>I enkeltspaltoppgaver er mørke striper enklest å bruke fordi de har nøyaktige betingelser: $b\\sin\\theta=m\\lambda$. Maksima utenom sentraltoppen ligger ikke nøyaktig midt mellom minima.</p>
      <p>For sirkulære åpninger er Rayleigh-kriteriet den viktigste huskeregelen: mindre åpning eller større bølgelengde gir større Airy-skive og dårligere oppløsning.</p>`,
    workedTitle:'Regneeksempel — apertur fra Airy-spot',
    problem:'En laser med $\\lambda=633\\text{ nm}$ sendes gjennom en sirkulær apertur og lager første mørke ring med radius $1{,}5\\text{ mm}$ på en vegg $5{,}0\\text{ m}$ unna. Finn aperturdiameteren.',
    solution:`<div class="step"><span class="lbl">Rayleigh</span><p>$\\theta\\approx x/L=1{,}5\\times10^{-3}/5{,}0=3{,}0\\times10^{-4}$ rad.</p></div>
      <div class="step"><span class="lbl">Diameter</span><p>$D=1{,}22\\lambda/\\theta=1{,}22(633\\times10^{-9})/(3{,}0\\times10^{-4})=2{,}57\\times10^{-3}\\text{ m}$.</p></div>`,
    answer:'D ≈ 2,6 mm',
    questions:[
      {n:'3', q:'Første minimum for enkeltspalt kommer når:',
       opts:['$b\\sin\\theta=\\lambda$','$b\\sin\\theta=\\lambda/2$','$D=1{,}22\\lambda$','$L=b^2\\lambda$'],
       answer:0, ex:'Minima for enkeltspalt er $b\\sin\\theta=m\\lambda$, første for $m=1$.'},
      {n:'4', q:'Hvis aperturdiameteren dobles, blir Airy-vinkelen:',
       opts:['doblet','halvert','uendret','fire ganger større'],
       answer:1, ex:'$\\Delta\\theta=1{,}22\\lambda/D$, altså omvendt proporsjonal med D.'}
    ]
  },
  diff2: {
    explainTitle:'Mer forklaring — gitteret skiller bølgelengder med orden og antall spalter',
    explain:`<p>Et gitter gir smale topper fordi mange spalter må være i fase samtidig. Flere belyste spalter gir smalere topper og bedre evne til å skille nære bølgelengder.</p>
      <p>Høyere orden gir også bedre oppløsning, men ordenene kan overlappe. Derfor må du alltid sjekke hvilke bølgelengder som kan eksistere i samme vinkelområde.</p>`,
    workedTitle:'Regneeksempel — gittervinkel og oppløsning',
    problem:'Et gitter har 600 linjer/mm og belyses normalt med $\\lambda=500\\text{ nm}$. Finn vinkelen for 1. orden og oppløsningen hvis 3000 spalter er belyst.',
    solution:`<div class="step"><span class="lbl">Gitteravstand</span><p>$a=1/(600\\times10^3)=1{,}67\\times10^{-6}\\text{ m}$.</p></div>
      <div class="step"><span class="lbl">Vinkel</span><p>Normal innfall: $m\\lambda=a\\sin\\theta$. For $m=1$: $\\sin\\theta=500\\times10^{-9}/1{,}67\\times10^{-6}=0{,}300$, så $\\theta=17{,}5^\\circ$.</p></div>
      <div class="step"><span class="lbl">Oppløsning</span><p>$\\mathcal R=mN=1\\cdot3000=3000$.</p></div>`,
    answer:'θ₁ ≈ 17,5°, R = 3000',
    questions:[
      {n:'3', q:'Hva øker gitterets spektrale oppløsning?',
       opts:['lavere orden og færre spalter','høyere orden eller flere belyste spalter','kortere skjermavstand alene','mindre intensitet alene'],
       answer:1, ex:'$\\mathcal R=mN$, så både orden m og antall belyste spalter N øker oppløsningen.'},
      {n:'4', q:'Gitterordener kan overlappe fordi:',
       opts:['samme vinkel kan tilfredsstille likningen for ulike $m$ og $\\lambda$','alle bølgelengder har samme energi','spaltene er for brede','Fourier-transformen mangler fase'],
       answer:0, ex:'Gitterlikningen inneholder produktet $m\\lambda$, så ulike kombinasjoner kan gi samme vinkel.'}
    ]
  }
};

M.forEach(m=>{
  if(EXTRAS[m.id]) m.html += practiceBlock(EXTRAS[m.id]);
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
const THEME_KEY='tfy4195_theme_v1';
let currentPage='top';
let canvasResizeHandlers=[];

function loadProg(){ try{ return JSON.parse(localStorage.getItem(PROG_KEY))||{}; }catch(e){ return window.__prog||{}; } }
function saveProg(p){ window.__prog=p; try{ localStorage.setItem(PROG_KEY,JSON.stringify(p)); }catch(e){} }
function loadTheme(){ try{ return localStorage.getItem(THEME_KEY)||'light'; }catch(e){ return 'light'; } }
function saveTheme(theme){ try{ localStorage.setItem(THEME_KEY,theme); }catch(e){} }

function applyTheme(theme){
  const mode = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = mode;
  const btn=document.getElementById('themeToggle');
  if(btn){
    btn.textContent = mode === 'dark' ? 'Mørk' : 'Lys';
    btn.title = mode === 'dark' ? 'Mørkt tema' : 'Lyst tema';
    btn.setAttribute('aria-label', mode === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema');
  }
  document.querySelectorAll('canvas').forEach(c=>{ if(c.__draw) c.__draw(); });
}

function toggleTheme(){
  const next = (document.documentElement.dataset.theme || 'light') === 'dark' ? 'light' : 'dark';
  saveTheme(next);
  applyTheme(next);
}

function pageFromHash(){
  const raw=decodeURIComponent((location.hash||'#top').replace(/^#\/?/,'')).trim();
  return raw || 'top';
}

function validPage(page){
  return page === 'top' || page === 'plan' || M.some(m=>m.id===page);
}

function navigate(page){
  const target=validPage(page) ? page : 'top';
  if(pageFromHash() === target) renderRoute();
  else location.hash=target;
}

function renderHero(){
  return `<section class="hero" id="top">
    <div class="hero-tag">NTNU · Institutt for fysikk · V2026</div>
    <h1>TFY4195 Optikk: pensum, eksamen og <span class="accent-text">regnetrening</span></h1>
    <p>Guiden samler pensumet i én arbeidsflate: først begrepene du må kunne forklare, deretter formlene du må kunne bruke, og til slutt typiske eksamensgrep. Hver modul følger samme rytme med læringsmål, kjerneteori, formelbruk, eksamensfokus, regneeksempel og selvtest.</p>
    <div class="hero-stats">
      <div class="stat"><b>13</b><span>moduler</span></div>
      <div class="stat"><b>36</b><span>regneeksempler</span></div>
      <div class="stat"><b>5</b><span>interaktive modeller</span></div>
      <div class="stat"><b>60</b><span>selvtestspørsmål</span></div>
      <div class="stat"><b>7</b><span>eksamenssett brukt</span></div>
    </div>
  </section>`;
}

function moduleShortTitle(m){
  return m.title.split('—')[0].split(',')[0].split('&')[0].trim();
}

function renderOverview(){
  return renderHero() + `<section class="module">
    <div class="card"><h3><span class="dot"></span>Slik kommer du i gang</h3>
      <p class="lede">Velg en modul nedenfor, eller bruk menyen til venstre for å hoppe rett til et tema.</p>
      <p>Usikker på rekkefølgen? Start med <a href="#plan" data-page="plan">studieplanen</a> — den viser hvordan temaene bygger på hverandre uke for uke. Fremgangen din lagres lokalt i nettleseren, så avkryssede moduler huskes til neste gang.</p>
    </div>
    <div class="overview-grid">
      ${M.map(m=>`<a class="module-tile" href="#${m.id}" data-page="${m.id}">
        <div class="tile-num">${m.num}</div>
        <div class="tile-title">${m.title}</div>
        <div class="tile-week">${m.week}</div>
      </a>`).join('')}
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
      <p>Ikke les alle avsnitt med samme tempo. Bruk kjerneteorien til å forstå hva størrelsene betyr, bruk formelboksen til å trene på valg av riktig likning, og bruk eksamensfeltet til å se hvilke fallgruver som faktisk går igjen.</p>
      <ol>
        <li><strong>Les modulen</strong> — start med læringsmålene, så kjerneteorien.</li>
        <li><strong>Lær formlene</strong> — de fleste står på det utdelte formelarket, men du må vite <em>når</em> og <em>hvordan</em> de brukes.</li>
        <li><strong>Gjør regneeksempelet</strong> uten å se på løsningen først.</li>
        <li><strong>Ta selvtesten</strong> — disse er bygget på faktiske eksamensspørsmål.</li>
        <li><strong>Lek med simuleringene</strong> for intuisjon på linser, Fresnel, Young og diffraksjon.</li>
        <li><strong>Kryss av modulen</strong> når du føler deg trygg — følg fremgangslinjen øverst.</li>
      </ol>
      <p><strong>Hjelpemidler på eksamen:</strong> enkel kalkulator, Rottmann-tabell, linjal/vinkelhake (for strålegang), og det provisoriske formelarket. Tren derfor på å bruke nettopp disse formlene.</p>
      <div class="method-grid">
        <div><h4>Læringsmål</h4><p>Les dem som en sjekkliste: hvis du kan forklare hvert punkt uten notater og regne én enkel variant, er modulen under kontroll.</p></div>
        <div><h4>Formelbokser</h4><p>De er ikke ment som puggeliste alene. Merk særlig fortegn, gyldighetsbetingelser og hvilken fysisk størrelse likningen faktisk gir.</p></div>
        <div><h4>Eksamensfokus</h4><p>Dette peker ut typiske spørsmålsformer, ikke fasit på en bestemt oppgave. Bruk det til å velge gamle oppgaver strategisk.</p></div>
        <div><h4>Selvtester</h4><p>Svar før du åpner forklaringen. Hvis et alternativ frister, men er feil, skriv ned hvorfor det var plausibelt.</p></div>
      </div>
    </div>
    <div class="plan-grid">
      ${PLAN.map(p=>`<div class="week-card"><div class="wk">${p[0]}</div><div class="wt">${p[1]}</div><div class="wd">${p[2]}</div></div>`).join('')}
    </div>
  </section>`;
}

function renderModule(m, idx, prog){
  const done = prog[m.id] ? 'done':'';
  const prev=M[idx-1], next=M[idx+1];
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
    <div class="page-actions">
      ${prev?`<a class="page-link" href="#${prev.id}" data-page="${prev.id}">Forrige: ${prev.num}</a>`:`<span class="page-link disabled"></span>`}
      ${next?`<a class="page-link" href="#${next.id}" data-page="${next.id}">Neste: ${next.num}</a>`:`<a class="page-link" href="#plan" data-page="plan">Til studieplan</a>`}
    </div>
  </section>`;
}

function renderSidebar(prog, activePage){
  let h = `<div class="nav-section">Kom i gang</div>
    <a class="nav-link ${activePage==='top'?'active':''}" href="#top" data-page="top"><span class="nav-num">↑</span>Oversikt</a>
    <a class="nav-link ${activePage==='plan'?'active':''}" href="#plan" data-page="plan"><span class="nav-num">★</span>Studieplan</a>
    <div class="nav-section">Moduler</div>`;
  M.forEach(m=>{
    h += `<a class="nav-link ${prog[m.id]?'done':''} ${activePage===m.id?'active':''}" href="#${m.id}" data-page="${m.id}">
      <span class="nav-num">${m.num}</span>${moduleShortTitle(m)}
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
  applyTheme(loadTheme());
  const themeBtn=document.getElementById('themeToggle');
  if(themeBtn) themeBtn.addEventListener('click',toggleTheme);
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

function renderRoute(){
  const page=validPage(pageFromHash()) ? pageFromHash() : 'top';
  currentPage=page;
  const prog=loadProg();
  clearCanvasResizeHandlers();
  document.getElementById('sidebar').innerHTML = renderSidebar(prog,page);
  document.getElementById('content').innerHTML = renderPage(page, prog) + renderFooter();
  bindPageLinks();
  updateProgress(prog);

  // KaTeX
  if(window.renderMathInElement){
    renderMathInElement(document.getElementById('content'),{
      delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
      throwOnError:false
    });
  }

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
      const nav=document.querySelector(`.nav-link[data-page="${id}"]`);
      if(nav) nav.classList.toggle('done',p[id]);
      updateProgress(p);
    });
  });

  // init visualizations
  initLens(); initFresnel(); initYoung(); initDiff(); initRayTrace(); initRayVec(); initSignConv(); initElemAct();
  window.scrollTo(0,0);
}

function renderPage(page, prog){
  if(page === 'top') return renderOverview();
  if(page === 'plan') return renderPlan();
  const idx=M.findIndex(m=>m.id===page);
  return idx >= 0 ? renderModule(M[idx], idx, prog) : renderOverview();
}

function renderFooter(){
  return `<div class="footer"><span class="accent-text">TFY4195 Optikk</span> · Interaktiv pensumguide · bygget fra pensumliste, formelark og eksamenssett 2018–2025<br>Praktisk på eksamen: ha linjal og vinkelhake klar til strålegang-oppgavene.</div>`;
}

function bindPageLinks(){
  document.querySelectorAll('[data-page]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    navigate(a.dataset.page);
    closeMenu();
  }));
}

function resetProgress(){ saveProg({}); renderRoute(); }
function setMenuState(open){
  document.getElementById('sidebar').classList.toggle('open',open);
  document.getElementById('scrim').classList.toggle('show',open);
  const t=document.querySelector('.menu-toggle');
  if(t){ t.setAttribute('aria-expanded',open?'true':'false'); t.setAttribute('aria-label',open?'Lukk meny':'Åpne meny'); }
}
function closeMenu(){ setMenuState(false); }
function toggleMenu(){ setMenuState(!document.getElementById('sidebar').classList.contains('open')); }

/* ============================ VISUALISERINGER ============================ */
function fitCanvas(c){ const r=c.getBoundingClientRect(); const dpr=window.devicePixelRatio||1; c.width=r.width*dpr; c.height=c.height*dpr/(c.__h?c.__h:1); }
function cssVar(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
function clearCanvasResizeHandlers(){
  canvasResizeHandlers.forEach(h=>window.removeEventListener('resize',h));
  canvasResizeHandlers=[];
}
function setupCanvas(id,cssH){
  const c=document.getElementById(id); if(!c) return null;
  const dpr=window.devicePixelRatio||1;
  function size(){ const w=c.clientWidth; c.width=w*dpr; c.height=cssH*dpr; const ctx=c.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); c.__w=w; c.__h=cssH; }
  const onResize=()=>{ size(); if(c.__draw)c.__draw(); };
  c.style.height=cssH+'px'; size(); window.addEventListener('resize',onResize); canvasResizeHandlers.push(onResize);
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
    ctx.strokeStyle=cssVar('--line2'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    const SO=+so.value, F=+f.value;
    // lens at cx
    ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(cx,cy-95); ctx.lineTo(cx,cy+95); ctx.stroke();
    // lens shape hints
    ctx.fillStyle=cssVar('--accent'); ctx.globalAlpha=.10;
    ctx.beginPath(); ctx.ellipse(cx,cy,9,95,0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;
    // focal points
    ctx.fillStyle=cssVar('--cyan');
    [[-F,'F'],[F,"F'"]].forEach(p=>{ ctx.beginPath(); ctx.arc(cx+p[0],cy,3,0,7); ctx.fill(); ctx.font='11px IBM Plex Mono'; ctx.fillText(p[1],cx+p[0]-4,cy+18); });
    // object (upright arrow at -SO)
    const ho=55, ox=cx-SO;
    ctx.strokeStyle=cssVar('--green'); ctx.lineWidth=2.5; arrow(ctx,ox,cy,ox,cy-ho);
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
    ctx.strokeStyle=cssVar('--yellow'); ctx.globalAlpha=.85; ctx.beginPath(); ctx.moveTo(tipX,tipY); ctx.lineTo(cx,tipY);
    let ix2=cx+si, iy2=cy-hi; let slope=(iy2-tipY)/(ix2-cx);
    ctx.lineTo(cx + (real? si : Math.min(W-cx, 400)), tipY + slope*((real?si:Math.min(W-cx,400))));
    ctx.stroke(); ctx.globalAlpha=1;
    // ray 2: through center, straight
    ctx.strokeStyle=cssVar('--cyan'); ctx.globalAlpha=.85; ctx.beginPath(); ctx.moveTo(tipX,tipY);
    const s2=(cy-tipY)/(cx-tipX); ctx.lineTo(W, tipY+s2*(W-tipX)); ctx.stroke(); ctx.globalAlpha=1;
    // image arrow
    if(isFinite(ix)&&Math.abs(ix-cx)<W){
      ctx.strokeStyle = real? cssVar('--red'):cssVar('--orange'); ctx.setLineDash(real?[]:[5,4]); ctx.lineWidth=2.5;
      arrow(ctx,ix,cy,ix,cy-hi); ctx.setLineDash([]);
    }
    // labels
    ctx.fillStyle=cssVar('--ink-dim'); ctx.font='12px IBM Plex Mono';
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
    ctx.strokeStyle=cssVar('--line'); ctx.fillStyle=cssVar('--ink-faint'); ctx.font='10px IBM Plex Mono'; ctx.lineWidth=1;
    for(let R=0;R<=1;R+=0.25){ const y=y0-R*ph; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x0+pw,y); ctx.stroke(); ctx.fillText(R.toFixed(2),6,y+3); }
    for(let d=0;d<=90;d+=15){ const x=x0+d/90*pw; ctx.fillText(d+'°',x-8,H-12); }
    ctx.fillText('R',x0-6,padT+4);
    // curves (R = r^2)
    function plot(fn,color,dash){ ctx.strokeStyle=color; ctx.lineWidth=2; ctx.setLineDash(dash||[]); ctx.beginPath();
      for(let i=0;i<=180;i++){ const th=i/180*(Math.PI/2); const Rr=fn(th,n)**2; const x=x0+(i/180)*pw; const y=y0-Math.min(1,Rr)*ph; i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); ctx.setLineDash([]); }
    plot(rTE,cssVar('--accent')); plot(rTM,cssVar('--orange'));
    // legend
    ctx.font='12px IBM Plex Mono';
    ctx.fillStyle=cssVar('--accent'); ctx.fillText('— R (TE)',x0+pw-92,padT+12);
    ctx.fillStyle=cssVar('--orange'); ctx.fillText('— R (TM)',x0+pw-92,padT+28);
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
    ctx.fillStyle=cssVar('--ink-dim'); ctx.font='11px IBM Plex Mono'; ctx.fillText('intensitet I = 4I₀cos²(πa·sinθ/λ)',10,gy-gh-6);
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
    ctx.strokeStyle=cssVar('--orange'); ctx.globalAlpha=.55; ctx.lineWidth=1.5; ctx.setLineDash([5,4]); ctx.beginPath();
    for(let x=0;x<W;x++){ const u=(x-W/2)/W*Math.PI*8; const beta=B*u*60; const env=beta===0?1:(Math.sin(beta)/beta)**2; const y=gy-env*gh; x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha=1;
    // full pattern
    ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2; ctx.beginPath();
    for(let x=0;x<W;x++){ const u=(x-W/2)/W*Math.PI*8; const beta=B*u*60; const alpha=A*u*60;
      const env=beta===0?1:(Math.sin(beta)/beta)**2;
      const gr= Math.abs(Math.sin(alpha))<1e-6 ? NN*NN : (Math.sin(NN*alpha)/Math.sin(alpha))**2;
      const I=env*gr/(NN*NN); const y=gy-Math.min(1,I)*gh; x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();
    ctx.fillStyle=cssVar('--ink-dim'); ctx.font='11px IBM Plex Mono'; ctx.fillText('I = I₀(sinβ/β)²·(sinNα/sinα)²   — stiplet: enkeltspalt-konvolutt',10,18);
    document.getElementById('NVal').textContent=NN;
    document.getElementById('bVal').textContent=(+b.value);
    document.getElementById('aDVal').textContent=(+a.value);
    document.getElementById('diffReadout').innerHTML=`N = <b>${NN}</b> spalt${NN>1?'er':''}. ${NN===1?'Ren enkeltspalt: bred sentraltopp, minima ved b·sinθ=mλ.':`${NN-1} minima og ${NN-2<0?0:NN-2} sekundærmaksima mellom hovedmaksima. Smalere spalt b ⇒ bredere konvolutt; større a ⇒ tettere hovedtopper.`}`;
  }
  c.__draw=draw; [N,b,a].forEach(s=>s.addEventListener('input',draw)); draw();
}

/* ----- 5. Ray tracing (to linser) ----- */
function initRayTrace(){
  const c=setupCanvas('rayCanvas',320); if(!c) return; const ctx=c.getContext('2d');
  const f1s=document.getElementById('f1Slider'), f2s=document.getElementById('f2Slider'), ds=document.getElementById('dSlider');
  const So=130, Tail=150, apt=34, y0=24;            // scene-enheter
  function draw(){
    const W=c.__w, H=c.__h, cy=H*0.5;
    ctx.clearRect(0,0,W,H);
    const F1=+f1s.value, F2=+f2s.value, D=+ds.value;
    const Lscene=So+D+Tail, mx=22, sc=(W-2*mx)/Lscene;
    const X=x=>mx+x*sc, Y=y=>cy-y*sc;
    const x1=So, x2=So+D, xEnd=Lscene;
    function vArrow(px,yBase,yTip,col){ ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(px,yBase); ctx.lineTo(px,yTip); ctx.stroke(); const dir=yTip<yBase?-1:1; ctx.beginPath(); ctx.moveTo(px,yTip); ctx.lineTo(px-4,yTip-dir*7); ctx.lineTo(px+4,yTip-dir*7); ctx.closePath(); ctx.fill(); }
    // akse
    ctx.strokeStyle=cssVar('--line2'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    // linser
    function drawLens(xs,label){
      ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(X(xs),Y(apt)); ctx.lineTo(X(xs),Y(-apt)); ctx.stroke();
      ctx.fillStyle=cssVar('--accent'); ctx.globalAlpha=.10; ctx.beginPath(); ctx.ellipse(X(xs),cy,7,apt*sc,0,0,7); ctx.fill(); ctx.globalAlpha=1;
      ctx.fillStyle=cssVar('--ink-dim'); ctx.font='11px IBM Plex Mono'; ctx.fillText(label,X(xs)-7,Y(apt)-6);
    }
    drawLens(x1,'L₁'); drawLens(x2,'L₂');
    // brennpunkt
    ctx.fillStyle=cssVar('--cyan');
    [x1-F1,x1+F1,x2-F2,x2+F2].forEach(p=>{ const px=X(p); if(px>0&&px<W){ ctx.beginPath(); ctx.arc(px,cy,2.5,0,7); ctx.fill(); }});
    // objekt-pil
    vArrow(X(0),cy,Y(y0),cssVar('--green'));
    // stråler fra objektets topp
    const tip=y0, inv=v=>Math.abs(v)<1e-9?1e9:1/v, outB=[];
    [-apt*0.8,-apt*0.4,0,apt*0.4,apt*0.8].forEach(yt=>{
      const a0=(yt-tip)/So;
      const yA=tip+a0*So, a1=a0-yA/F1, yB=yA+a1*D, a2=a1-yB/F2, yC=yB+a2*Tail;
      ctx.strokeStyle=cssVar('--accent'); ctx.globalAlpha=.8; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(X(0),Y(tip)); ctx.lineTo(X(x1),Y(yA)); ctx.lineTo(X(x2),Y(yB)); ctx.lineTo(X(xEnd),Y(yC)); ctx.stroke();
      outB.push(yB);
    });
    ctx.globalAlpha=1;
    // bilde
    const si1=inv(1/F1-1/So), m1=-si1/So, yi1=m1*tip;
    const so2=D-si1, si2=inv(1/F2-1/so2), m2=-si2/so2, mtot=m1*m2, yi2=mtot*tip;
    const ximg=x2+si2;                              // si2<0 ⇒ til venstre for L₂ ⇒ virtuelt
    const virtual=si2<0;
    const col=cssVar('--orange');
    const imgVisible=isFinite(ximg)&&Math.abs(si2)<1e7&&ximg>0&&ximg<xEnd;
    if(imgVisible){
      if(virtual){
        // stiplede bakover-forlengelser av utgangsstrålene — de ser ut til å komme fra bildet
        ctx.save(); ctx.setLineDash([4,4]); ctx.strokeStyle=col; ctx.globalAlpha=.45; ctx.lineWidth=1;
        outB.forEach(yB=>{ ctx.beginPath(); ctx.moveTo(X(x2),Y(yB)); ctx.lineTo(X(ximg),Y(yi2)); ctx.stroke(); });
        ctx.globalAlpha=1; vArrow(X(ximg),cy,Y(yi2),col); ctx.restore();
        ctx.fillStyle=cssVar('--ink-dim'); ctx.font='10px IBM Plex Mono'; ctx.fillText('virtuelt bilde',X(ximg)-30,cy+(yi2>0?14:-7));
      } else {
        vArrow(X(ximg),cy,Y(yi2),col);
        ctx.fillStyle=cssVar('--ink-dim'); ctx.font='10px IBM Plex Mono'; ctx.fillText('bilde',X(ximg)-12,cy+(yi2>0?14:-7));
      }
    }
    // systemmatrise + avlesning
    const A=1-D/F1, B=D, Cc=-1/F1-1/F2+D/(F1*F2), Del=1-D/F2, det=A*Del-B*Cc;
    const afoc=Math.abs(Cc)<1.2e-4, feff=afoc?Infinity:-1/Cc;
    f1s&&(document.getElementById('f1Val').textContent=F1+' enh');
    document.getElementById('f2Val').textContent=F2+' enh';
    document.getElementById('dVal').textContent=D+' enh';
    let msg=`M = L₂·T(D)·L₁ = [ [${A.toFixed(2)}, ${B.toFixed(0)}], [${Cc.toFixed(4)}, ${Del.toFixed(2)}] ] · &nbsp;det = <b>${det.toFixed(2)}</b>. `;
    msg += afoc
      ? `<b>C ≈ 0 ⇒ afokalt</b> system — vinkelforstørrelse D = <b>${Del.toFixed(2)}</b>.`
      : `effektiv f = −1/C = <b>${feff.toFixed(0)} enh</b>. Endebilde: <b>${virtual?'virtuelt':'reelt'}</b>, m = <b>${mtot.toFixed(2)}</b> ${imgVisible?(virtual?'(stiplet pil)':'(oransje pil)'):'(utenfor figuren)'}.`;
    document.getElementById('rayReadout').innerHTML=msg;
  }
  c.__draw=draw; [f1s,f2s,ds].forEach(s=>s.addEventListener('input',draw)); draw();
}

/* ----- 6. Diagram: strålevektor (y, α) ----- */
function initRayVec(){
  const c=setupCanvas('rayVecCanvas',190); if(!c) return; const ctx=c.getContext('2d');
  function draw(){
    const W=c.__w,H=c.__h, cy=H*0.66, mx=18;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle=cssVar('--line2'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    ctx.fillStyle=cssVar('--ink-faint'); ctx.font='11px IBM Plex Mono'; ctx.fillText('optisk akse',W-92,cy+15);
    const x0=mx+10, y0=cy+34, x1=W-mx-12, y1=cy-78, m=(y1-y0)/(x1-x0);
    const xC=x0+(cy-y0)/m, xRef=Math.round(W*0.62), yRef=y0+m*(xRef-x0);
    // referanseplan
    ctx.strokeStyle=cssVar('--ink-faint'); ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(xRef,cy-94); ctx.lineTo(xRef,cy+22); ctx.stroke(); ctx.setLineDash([]);
    // stråle
    ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2; arrow(ctx,x0,y0,x1,y1);
    // høyde y
    ctx.strokeStyle=cssVar('--green'); ctx.fillStyle=cssVar('--green'); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(xRef,cy); ctx.lineTo(xRef,yRef); ctx.stroke();
    ctx.font='14px IBM Plex Mono'; ctx.fillText('y',xRef+7,(cy+yRef)/2+5);
    // vinkel α
    ctx.strokeStyle=cssVar('--orange'); ctx.fillStyle=cssVar('--orange'); ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.arc(xC,cy,30,0,Math.atan2(m,1),true); ctx.stroke();
    ctx.fillText('α',xC+36,cy-8);
    // punkt + merke
    ctx.fillStyle=cssVar('--accent'); ctx.beginPath(); ctx.arc(xRef,yRef,3.5,0,7); ctx.fill();
    ctx.fillStyle=cssVar('--ink-dim'); ctx.font='12px IBM Plex Mono'; ctx.fillText('stråle = (y, α)',xRef+11,yRef-5);
  }
  c.__draw=draw; draw();
}

/* ----- 7. Diagram: fortegn & avbildning ----- */
function initSignConv(){
  const c=setupCanvas('signConvCanvas',280); if(!c) return; const ctx=c.getContext('2d');
  function vArr(px,yB,yT,col){ ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(px,yB); ctx.lineTo(px,yT); ctx.stroke(); const d=yT<yB?-1:1; ctx.beginPath(); ctx.moveTo(px,yT); ctx.lineTo(px-4,yT-d*7); ctx.lineTo(px+4,yT-d*7); ctx.closePath(); ctx.fill(); }
  function dim(xA,xB,yy,label){ ctx.strokeStyle=cssVar('--ink-faint'); ctx.fillStyle=cssVar('--ink-faint'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(xA,yy); ctx.lineTo(xB,yy); ctx.moveTo(xA,yy-4); ctx.lineTo(xA,yy+4); ctx.moveTo(xB,yy-4); ctx.lineTo(xB,yy+4); ctx.stroke(); ctx.font='13px IBM Plex Mono'; ctx.fillText(label,(xA+xB)/2-4,yy-5); }
  function draw(){
    const W=c.__w,H=c.__h, cy=H*0.42;
    ctx.clearRect(0,0,W,H);
    const So=210, f=70, Si=105, ho=30, sceneR=So+Si+18, pad=36, sc=(W-2*pad)/sceneR;
    const X=x=>pad+x*sc, hoP=ho*sc, hiP=0.5*ho*sc;
    const xObj=X(0), xLens=X(So), xImg=X(So+Si), xF=X(So-f), xFp=X(So+f);
    // akse + linse
    ctx.strokeStyle=cssVar('--line2'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(xLens,cy-hoP-22); ctx.lineTo(xLens,cy+hoP+22); ctx.stroke();
    ctx.fillStyle=cssVar('--accent'); ctx.globalAlpha=.10; ctx.beginPath(); ctx.ellipse(xLens,cy,7,hoP+22,0,0,7); ctx.fill(); ctx.globalAlpha=1;
    // brennpunkt
    ctx.fillStyle=cssVar('--cyan'); ctx.font='12px IBM Plex Mono';
    [[xF,'F'],[xFp,"F'"]].forEach(p=>{ ctx.beginPath(); ctx.arc(p[0],cy,3,0,7); ctx.fill(); ctx.fillText(p[1],p[0]-4,cy-8); });
    // prinsipalstråler
    ctx.strokeStyle=cssVar('--accent'); ctx.globalAlpha=.8; ctx.lineWidth=1.3;
    ctx.beginPath(); ctx.moveTo(xObj,cy-hoP); ctx.lineTo(xLens,cy-hoP); ctx.lineTo(xImg,cy+hiP); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xObj,cy-hoP); ctx.lineTo(xImg,cy+hiP); ctx.stroke();
    ctx.globalAlpha=1;
    // objekt + bilde
    vArr(xObj,cy,cy-hoP,cssVar('--green')); ctx.fillStyle=cssVar('--green'); ctx.font='13px IBM Plex Mono'; ctx.fillText('hₒ',xObj-22,cy-hoP/2); ctx.font='11px IBM Plex Mono'; ctx.fillText('objekt',xObj-16,cy+16);
    vArr(xImg,cy,cy+hiP,cssVar('--orange')); ctx.fillStyle=cssVar('--orange'); ctx.font='13px IBM Plex Mono'; ctx.fillText('hᵢ',xImg+6,cy+hiP/2); ctx.font='11px IBM Plex Mono'; ctx.fillText('bilde',xImg-8,cy+hiP+16);
    // dimensjonslinjer
    const yd=cy+hoP+24;
    dim(xObj,xLens,yd,'sₒ'); dim(xLens,xImg,yd,'sᵢ'); dim(xLens,xFp,cy-hoP-30,'f');
    ctx.fillStyle=cssVar('--ink-faint'); ctx.font='11px IBM Plex Mono'; ctx.fillText('R > 0: krumningssenter til høyre',pad,H-8);
  }
  c.__draw=draw; draw();
}

/* ----- 8. Diagram: elementenes virkning ----- */
function initElemAct(){
  const c=setupCanvas('elemActCanvas',200); if(!c) return; const ctx=c.getContext('2d');
  function draw(){
    const W=c.__w,H=c.__h, pw=W/3, cy=H*0.52;
    ctx.clearRect(0,0,W,H);
    function panel(i,title,sub,fn){
      const x0=i*pw, cx=x0+pw/2;
      if(i>0){ ctx.strokeStyle=cssVar('--line'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x0,18); ctx.lineTo(x0,H-22); ctx.stroke(); }
      ctx.fillStyle=cssVar('--ink'); ctx.font='12px IBM Plex Mono'; ctx.textAlign='center'; ctx.fillText(title,cx,22);
      ctx.strokeStyle=cssVar('--line2'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x0+14,cy); ctx.lineTo(x0+pw-14,cy); ctx.stroke();
      ctx.textAlign='left'; fn(x0,cx);
      ctx.fillStyle=cssVar('--ink-faint'); ctx.font='10px IBM Plex Mono'; ctx.textAlign='center'; ctx.fillText(sub,cx,H-9); ctx.textAlign='left';
    }
    panel(0,'Translasjon T(d)','vinkel uendret, y øker',(x0)=>{
      ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2; arrow(ctx,x0+16,cy+26,x0+pw-16,cy-30);
    });
    panel(1,'Tynn linse L(f)',"knekker vinkelen mot F'",(x0,cx)=>{
      const lx=cx, fpx=x0+pw-22;
      ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(lx,cy-34); ctx.lineTo(lx,cy+34); ctx.stroke();
      ctx.lineWidth=1.7; ctx.beginPath(); ctx.moveTo(x0+14,cy-20); ctx.lineTo(lx,cy-20); ctx.stroke();
      arrow(ctx,lx,cy-20,fpx,cy);
      ctx.fillStyle=cssVar('--cyan'); ctx.beginPath(); ctx.arc(fpx,cy,3,0,7); ctx.fill();
      ctx.fillStyle=cssVar('--ink-faint'); ctx.font='11px IBM Plex Mono'; ctx.fillText("F'",fpx-2,cy-8);
    });
    panel(2,'Plan brytning R_P','y kontinuerlig, vinkel endres',(x0)=>{
      const ix=x0+pw*0.52;
      ctx.fillStyle=cssVar('--accent'); ctx.globalAlpha=.06; ctx.fillRect(ix,18,(x0+pw-14)-ix,H-40); ctx.globalAlpha=1;
      ctx.strokeStyle=cssVar('--line2'); ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(ix,18); ctx.lineTo(ix,H-22); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle=cssVar('--ink-faint'); ctx.font='10px IBM Plex Mono'; ctx.fillText('n₁',ix-15,30); ctx.fillText('n₂',ix+5,30);
      ctx.strokeStyle=cssVar('--accent'); ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(x0+14,cy+24); ctx.lineTo(ix,cy-6); ctx.stroke();
      arrow(ctx,ix,cy-6,x0+pw-14,cy-28);
    });
  }
  c.__draw=draw; draw();
}

/* ============================ BOOT ============================ */
document.addEventListener('DOMContentLoaded',boot);
