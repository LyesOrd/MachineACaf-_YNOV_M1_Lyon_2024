export interface NfcPodInterface {
    RegisterTagDetectedCallback(callback: (tagId: string) => void): void;
}