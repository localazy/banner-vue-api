import { Key } from '@localazy/ts-api/dist/models/responses/keys-in-file';

type KeysInFileForLanguage = {
    status: string;
    keys: Key[];
}

export default KeysInFileForLanguage;
