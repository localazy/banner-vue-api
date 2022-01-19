import LocalazyApi from '@localazy/ts-api';
import Project from '@localazy/ts-api/dist/models/responses/project';
import { Key } from '@localazy/ts-api/dist/models/responses/keys-in-file';
import KeysInFileForLanguage from '../models/keys-in-file-for-language';

const constants = {
  fileName: 'banners',
  projectSlug: 'banners-api',
};

type GenerateFile = {
    languageCode: string;
    title: Key['value'];
    label: Key['value'];
}

class LocalazyService {
    public api!: ReturnType<typeof LocalazyApi>;

    private project: Project | null = null;

    constructor() {
      this.api = LocalazyApi({
        projectToken: '18370618047140320971597ee3db7d72e0e53258209ccf95fb0fca70005ad8b65b9b5593746455acc3f5',
        baseUrl: '/api'
      });
    }

    async generateFile(options: GenerateFile) {
      return this.api.import({
        projectId: (await this.fetchProject()).id,
        files: [{
          name: constants.fileName,
          content: {
            [options.languageCode]: {
              title: options.title,
              label: options.label,
            },
          },
        }],
        forceCurrent: true,
        filterSource: false,
      });
    }

    async listProjectLanguages() {
      return (await this.fetchProject()).languages;
    }

    async listKeysInFileForLanguage(languageCode: string): Promise<KeysInFileForLanguage> {
      const project = await this.fetchProject();
      const file = await this.getFile(project.id);

      if (!file) {
        return {
          status: 'file_does_not_exist',
          keys: [],
        };
      }

      try {
        const data = await this.api.listKeysInFileForLanguage({
          projectId: project.id,
          fileId: file.id,
          lang: languageCode,
        });
        return {
          status: 'ok',
          keys: data.keys,
        };
      } catch (e) {
        return {
          status: 'language_not_found',
          keys: [],
        };
      }
    }

    private async getFile(projectId: string) {
      const files = await this.api.listFiles({
        projectId,
      });

      const file = files.find((f) => f.name === constants.fileName);
      return file;
    }

    private async fetchProject() {
      if (this.project !== null) { return this.project; }
      const projects = await this.api.listProjects({
        languages: true,
      });

      const project = projects.find((p) => p.slug === constants.projectSlug);
      if (!project) {
        throw new Error('Project not found');
      }
      this.project = project;
      return project;
    }
}

export default new LocalazyService();
