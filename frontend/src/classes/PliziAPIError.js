class PliziAPIError extends Error {
    constructor(method, errResponse) {
        const sts = errResponse  && errResponse.status ? errResponse.status : -1;
        const sText = errResponse  &&  errResponse.statusText ? errResponse.statusText : `Unknown status`;
        const eName = `PliziAPIError`;
        const msg = `PliziAP->${method}: ${sts} ${sText}`;

        super(msg);
        this.method = method;
        this.name = eName;
        this.status = sts;
        this.statusText = sText;
        this.message = '';
        this.data = {};

        if (errResponse  &&  errResponse.data) {
            this.data = errResponse.data;
            window.console.log( JSON.parse( JSON.stringify(errResponse.data) ), `errResponse.data` );

            if (errResponse.data.message) {
                this.message = (errResponse.data.message+'').trim();
            }

            if (errResponse.data.messages  &&  Array.isArray(errResponse.data.messages) && errResponse.data.messages.length>0) {
                this.message = errResponse.data.messages.join('\r\n').trim();
            }
        }

        this.detailMessage = `PliziAP->${this.method}: ${this.status} ${this.statusText}` + (this.message !== '' ? ' :'+this.message: '');

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PliziAPIError);
        }
        else {
            this.stack = (new Error()).stack;
        }
    }
}

export { PliziAPIError as default}
