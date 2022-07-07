

export function createMessageConnector(): GlobalInputMessageConnector;
interface ConnectResult {
    type: "device" | "mobile" | "pairing" | "error";
    connectionCode?: string;
    codeData?: CodeData;
    initData?: InitData;
    permission?: PermissionResultMessage;
    error?: string;
}

declare class GlobalInputMessageConnector {
    client: string;
    session: string;
    isConnected(): boolean;
    disconnect(): void;
    setCodeAES(codeAES: string): void;
    setSecurityGroup(securityGroup: string): void;
    connect(opts: ConnectOptions, encryptedCode?: string): Promise<ConnectResult>;
    sendInputMessage(value: FieldValue, index?: number, fieldId?: string): void;
    sendValue(fieldId: string | null | undefined, value: FieldValue, index?: number): void;
    sendInitData(initData: InitData): void;
    buildOptionsFromInputCodedata(codedata: CodeData, options?: ConnectOptions): ConnectOptions;
    buildInputCodeData(data?: CodeData): string;
    buildPairingData(data?: CodeData): string;
    processCodeData(encryptedCodeData?: string, options?: CodeProcessors): void;
    /*
        encryptedCodeData=[Type][EncryptedContent]
        switch(Type):
            case 'C': use the static shared encryption key to decrypt.
            case 'A': use the dynamic encryption key to decrypt.
            case 'N': the content is not encrypted
   */

}
type FieldValue = string | number | object | null | undefined;

export interface Sender {
    client: string;
    session: string;
}
interface ConnectOptions {
    initData?: InitData;
    url?: string;
    apikey?: string;
    securityGroup?: string;
    connectSession?: string;
    aes?: string;
    onInput?: (message: InputMessage) => void;
    onRegistered?: (connectionCode: string) => void;
    onRegisterFailed?: () => void;
    onSenderConnected?: (sender: Sender, senders: Sender[]) => void;
    onSenderDisconnected?: (sender: Sender, senders: Sender[]) => void;
    onInputPermission?: (permissionMessage: PermissionRequestMessage, senders: Sender[], allow: () => void, deny: (reason?: string) => void) => void;
    onInputPermissionResult?: (message: PermissionResultMessage) => void;
    onInputCodeData?: (codedata: CodeData) => void;
    onError?: (message: string) => void;
    onSocket?:(socket: any) => void;
}

interface InputMessage {
    client: string;
    data: {
        value: FieldValue;
        index?: number;
        id?: number;
        fieldId: string;
    };
    initData?: InitData;
}

interface CodeProcessors {
    onInputCodeData?: (codedata: CodeData) => void;
    onPairing?: (codedata: CodeData) => void;
    onError?: (message: string) => void;
}


interface InitData {
    id?: string;
    action?: string;
    dataType?: string;
    key?: string;
    form: {
        id?: string;
        title?: string;
        label?: string;
        domain?: string;
        fields: FormField[];
        views?: {
            viewIds: {
                [id: string]: object;
            }
        };
    }
}
interface FormField {
    id?: string;
    type?: string;
    label?: string;
    value?: FieldValue;
    nLines?: number;
    icon?: string;
    viewId?: string;
    iconText?: string | object;
    operations?: FormOperation;
    options?: object[];
    index?: number;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    items?: object[];
    selectType?: string;
    style?: object;
}




interface FormOperation {
    onInput: (value: FieldValue) => void;
}


interface PermissionResultMessage {
    allow: boolean;
    client?: string;
    connectSession?: string;
    initData?: InitData;
    securityGroup?: string;
    session?: string;
    reason?: string;
}
interface PermissionRequestMessage {
    client?: string;
    connectSession?: string;
    data?: object;
    time?: number;
    securityGroup?: string;
    session?: string;
}

interface CodeData {
    session?: string;
    url?: string;
    aes?: string;
    apikey?: string;
    securityGroup?: string;
    action?: string;
    codeAES?: string;
}

export function generateRandomString(length?: number): string;
export function encrypt(content: string, password: string): string;
export function decrypt(content: string, password: string): string;
