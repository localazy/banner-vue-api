import LocalazyApi from '../localazy-api/localazy-api';

const constants = {
  fileName: 'banners',
  projectSlug: 'banner-api-app',
};

class LocalazyService {
    public api!: ReturnType<typeof LocalazyApi>;

    private project: any = null;

    constructor() {
      this.api = LocalazyApi({
        projectToken: '18388854163874116234d25d2dc44cbe35d9f5195dc84255e3a60bdfaa3d6274a226c22ae1e8919a0d80',
      });
    }

    async generateFile() {
      await this.api.import({
        projectId: (await this.fetchProject()).id,
        files: [{
          name: constants.fileName,
          content: {
            en: {
              title: '',
              label: '',
            },
          },
        }],
      });
    }

    async listProjectLanguages() {
      return (await this.fetchProject()).languages;
    }

    async listKeysInFileForLanguage(language: string) {
      const project = await this.fetchProject();
      const file = await this.getFile(project.id);

      if (!file) {
        return {
          status: 'file_does_not_exist',
          keys: [],
        };
      }

      try {
        const keys = await this.api.listKeysInFileForLanguage({
          projectId: project.id,
          fileId: file.id,
          lang: language,
        });
        return {
          status: 'ok',
          keys,
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
