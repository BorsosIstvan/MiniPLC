// plc script
class HMI {
    constructor() {
        this.IX = [false, false, false, false];  // digitale ingangen van HMI (knoppen)
        this.QX = [false, false, false, false];  // digitale uitgangen van PLC naar HMI (lampen)
        this.IW = [0, 0, 0, 0];                    // analoge ingang (slider)
        this.QW = [0, 0, 0, 0];                    // analoge uitgang (display)

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

        const btn2 = document.getElementById("btn2");
        btn2.addEventListener("mousedown", () => this.IX[2] = true);
        btn2.addEventListener("mouseup", () => this.IX[2] = false);
        btn2.addEventListener("mouseleave", () => this.IX[2] = false);

        // Analoge invoer (IW) via slider
        const pot0 = document.getElementById("slider0");
        pot0.addEventListener("input", () => {
            this.IW[0] = parseInt(pot0.value);
        });
        const pot1 = document.getElementById("slider1");
        pot1.addEventListener("input", () => {
            this.IW[1] = parseInt(pot1.value);
        });
        const pot2 = document.getElementById("slider2");
        pot2.addEventListener("input", () => {
            this.IW[2] = parseInt(pot2.value);
        });

        // Transportband aansturen op basis van QX[1] bijvoorbeeld
        const belt = document.getElementById("belt");
    }

    update() {
        // Digitale uitgangen (QX) naar lampen
        for (let i = 0; i < this.QX.length; i++) {
            const lamp = document.getElementById(`lamp${i}`);
            if (lamp) lamp.classList.toggle("on", this.QX[i]);
        }

        // Analoge uitvoer (QW) naar tekst display
        for (let i = 0; i < this.QW.length; i++) {
        const display = document.getElementById(`display${i}`);
        if (display) {
            display.innerText = this.QW[i];
        }}

        // Analoge uitvoer (QW) naar baar
        document.getElementById("bar0").style.height = 100 - this.QW[3] + "%";

        // Transportband
        belt.style.animationPlayState = this.QX[3] ? "running" : "paused";
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

    set IN(value) {this.#IN = value;}
    set PT(value) {this.#PT = value;}
    get Q() {return this.#Q;}
    get ET() {return this.#ET;}

    update() {
        
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

class TOFF {
    #IN = false;
    #PT = 1000;       // preset tijd in ms
    #ET = 0;          // elapsed time
    #Q = false;
    #startTime = null;

    set IN(value) { this.#IN = value; }
    set PT(value) { this.#PT = value; }
    get ET() { return this.#ET; }
    get Q() { return this.#Q; }

    update() {
        const now = Date.now();

        if (this.#IN) {
            // Ingang is actief → uitgang moet true blijven
            this.#Q = true;
            this.#ET = 0;
            this.#startTime = null;
        } else {
            // Ingang is losgelaten → starten met aftellen
            if (this.#Q) {
                if (this.#startTime === null) {
                    this.#startTime = now;
                }

                this.#ET = now - this.#startTime;

                if (this.#ET >= this.#PT) {
                    this.#ET = this.#PT;
                    this.#Q = false; // tijd verstreken → uitgang gaat uit
                }
            } else {
                this.#ET = 0;
                this.#startTime = null;
            }
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

    update() {
        // Start Stop knop
        hmi.QX[0] = (hmi.IX[0] || hmi.QX[0]) && !hmi.IX[1];
        hmi.QW[0] = hmi.IW[0];
        toff.PT = hmi.IW[1];
        toff.IN = hmi.IX[0];
        hmi.QX[3] = toff.Q;
        toff.update();
    }
}

function init(){
    // PLC en HMI maken
    plc = new PLC();
    hmi = new HMI();
    toff = new TOFF();
}

init();

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
function applyUpdateSetup() {
    //const code = document.getElementById("codeEditor").value;
    const code = setup.getValue();
    try {
        // Nieuwe functie maken van tekst
        init = new Function(code);
        init();
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
  const setup = CodeMirror.fromTextArea(document.getElementById("setupEditor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "neo",
    tabSize: 2,
    indentUnit: 2
  });
