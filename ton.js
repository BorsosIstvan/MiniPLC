export class TON {
    constructor(PT) {
        this.IN = false;   // Ingang
        this.Q = false;    // Uitgang
        this.PT = PT;      // Preset Time in ms
        this.ET = 0;       // Elapsed Time
        this._startTime = null;
    }

    update(IN) {
        this.IN = IN;
        
        if (this.IN) {
        if (this._startTime === null) {
            this._startTime = Date.now();
        }
        this.ET = Date.now() - this._startTime;
        if (this.ET >= this.PT) {
            this.ET = this.PT;
            this.Q = true;
        }
        } else {
        this._startTime = null;
        this.ET = 0;
        this.Q = false;
        }
    }
}