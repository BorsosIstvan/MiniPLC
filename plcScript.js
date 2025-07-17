// plc script
class HMI {
    constructor() {
        this.IX = [false, false, false];  // digitale ingangen van HMI (knoppen)
        this.QX = [false, false, false];  // digitale uitgangen van PLC naar HMI (lampen)
        this.IW = [0];                    // analoge ingang (slider)
        this.QW = [0];                    // analoge uitgang (display)

        this._bindElements();
    }

    _bindElements() {
        // Digitale knoppen (IX)
        const btn0 = document.getElementById("btn0");
        btn0.addEventListener("mousedown", () => this.IX[0] = true);
        btn0.addEventListener("mouseup", () => this.IX[0] = false);
        btn0.addEventListener("mouseleave", () => this.IX[0] = false);

        const btn1 = document.getElementById("btn1");
        btn1.addEventListener("mousedown", () => this.IX[1] = true);
        btn1.addEventListener("mouseup", () => this.IX[1] = false);
        btn1.addEventListener("mouseleave", () => this.IX[1] = false);

        // Analoge invoer (IW) via slider
        const pot = document.getElementById("slider0");
        pot.addEventListener("input", () => {
            this.IW[0] = parseInt(pot.value);
        });
    }

    update() {
        // Digitale uitgangen (QX) naar lampen
        for (let i = 0; i < this.QX.length; i++) {
            const lamp = document.getElementById(`lamp${i}`);
            if (lamp) lamp.classList.toggle("on", this.QX[i]);
        }

        // Analoge uitvoer (QW) naar tekst display
        const display = document.getElementById("display0");
        if (display) {
            display.innerText = this.QW[0];
        }

        // Analoge uitvoer (QW) naar baar
        document.getElementById("bar0").style.width = this.QW[0] + "%";
    }
}

class TON {
    #IN = false;   // Ingang
    #Q = false;    // Uitgang
    #PT = 1000;      // Preset Time in ms
    #ET = 0;       // Elapsed Time
    #_startTime = null;
    constructor() {
    }

    setIN(IN) {this.#IN = IN;}
    setPT(PT) {this.#PT = PT;}
    get Q() {return this.#Q;}
    get ET() {return this.#ET;}

    update() {
        //this.IN = IN;
        
        if (this.#IN) {
        if (this.#_startTime === null) {
            this.#_startTime = Date.now();
        }
        this.#ET = Date.now() - this.#_startTime;
        if (this.#ET >= this.#PT) {
            this.#ET = this.#PT;
            this.#Q = true;
        }
        } else {
        this.#_startTime = null;
        this.#ET = 0;
        this.#Q = false;
        }
    }
}

class PLC {
    constructor() {
        this.IX = [false, false, false]; // digitale ingangen
        this.QX = [false, false, false]; // digitale uitgangen
        this.IW = [0];
        this.QW = [0];
    }
    timer0 = new TON;


    update() {
        // Start Stop knop
        hmi.QX[0] = (hmi.IX[0] || hmi.QX[0]) && !hmi.IX[1];
        hmi.QW[0] = hmi.IW[0];
        if (hmi.IW[0] > 30){
            hmi.QX[1] = true;
        }else{
            hmi.QX[1] = false;
        }
        if (hmi.IW[0] > 60){
            hmi.QX[2] = true;
        }else{
            hmi.QX[2] = false;
        }
        
    }
}

    // PLC maken
    let plc = new PLC();
    let hmi = new HMI();

    // PLC scan elke 20 ms
    setInterval(() => {
        try{
            plc.update();
            hmi.update();
        }catch (err){
            console.error("Fout in PLC update:", err);
        }
    }, 20);

function applyUpdateCode() {
    //const code = document.getElementById("codeEditor").value;
    const code = editor.getValue();
    try {
        // Nieuwe functie maken van tekst
        plc.update = new Function(code);
        // alert("Update-functie succesvol aangepast!");
    } catch (err) {
        alert("Fout in de functie: " + err.message);
    }
}

  // Initialiseer CodeMirror
  const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "neo",
    tabSize: 2,
    indentUnit: 2
  });
