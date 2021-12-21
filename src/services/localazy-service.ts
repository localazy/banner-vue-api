import LocalazyAPI from "./localazy-api"

type Constructor = {
    projectToken: string;
    baseUrl?: string;
}

type StaticOptions = {
    projectToken: string;
    baseUrl?: string;
}

type NonStaticOptions = {
    /** Optionally override initially set project token */
    projectToken?: string;
    baseUrl?: string;
}

type ListProjects = {
    /** Add information about the owning organization. */
    organization?: boolean;
    /** Add information about languages. */
    languages?: boolean;
}

type LocFileContentLanguage = {
    [k: string]: string | string[] | LocFileContentLanguage;
}

type LocFileContent = {
    /** The file type to be used for backing the strings. @see https://localazy.com/docs/api/import#response-1 */
    type?: string;
    plural?: string;
    array?: string;
    keyTransformer?: string;
    params?: Record<string, any>;
    features?: string[];
    // [locale: string]: LocFileContentKey;
} & LocFileContentLanguage;

type LocFile = {
    /** The file name */
    name: string;
    /** The path to the file without the file name. */
    path?: string;
    /** Optional module specification. */
    module?: any;
    /** Optional build type. */
    buildType?: any;
    library?: string;
    /** Optional product flavors. */
    productFlavors?: any;
    content: LocFileContent;
}

type Import = {
    projectId: string;
    importAsNew?: boolean;
    forceCurrent?: boolean;
    filterSource?: boolean;
    files: LocFile[];
}

export default class LocalazyService {
    private projectToken!: string;
    private baseUrl!: string;

    constructor(options: Constructor) {
        this.projectToken = options.projectToken;
        this.baseUrl = options.baseUrl || '';
    }

    /**
     * @see https://localazy.com/docs/api/list-projects
     */
    public static async listProjects(config: StaticOptions, options: ListProjects = {}) {
        return LocalazyAPI.get({
            url: `${config.baseUrl || ''}/projects`,
            projectToken: config.projectToken,
            options 
        })
    }

    /**
     * @see https://localazy.com/docs/api/list-projects
     */
    public async listProjects(options: ListProjects = {}, config: NonStaticOptions = {}) {
        return LocalazyAPI.get({
            url: `${config.baseUrl || this.baseUrl}/projects`,
            projectToken: config.projectToken || this.projectToken,
            options: options 
        })
    }

    public static async import(config: StaticOptions, options: Import) {
        let {projectId, ...payload} = options;
        return LocalazyAPI.post({
            url: `${config.baseUrl || ''}/projects/${projectId}/import`,
            projectToken: config.projectToken,
            options: payload as Omit<Import, "projectId">
        })
    }

    public async import(options: Import, config: NonStaticOptions = {}) {
        let {projectId, ...payload} = options;
        return LocalazyAPI.post({
            url: `${config.baseUrl || this.baseUrl}/projects/${projectId}/import`,
            projectToken: config.projectToken || this.projectToken,
            options: payload as Omit<Import, "projectId">
        })
    }
}