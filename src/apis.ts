import axios from 'axios';

export const getUser = async (access_token: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get('https://api.github.com/user', options);
  const { login, name, repos_url } = response.data;
  const user = {
    username: login,
    name: name,
    repos_url: repos_url,
    access_token: access_token,
    refresh_token: null,
  };
  return user;
};

export const getRepos = async (access_token: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(
    'https://api.github.com/user/repos',
    options,
  );
  const repos = response.data
    .map((repo) => {
      return {
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        created_at: repo.created_at,
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  return repos;
};

export const createRepo = async (access_token: string, payload) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.post(
    'https://api.github.com/user/repos',
    payload,
    options,
  );
  return response.status === 201;
};

export const addFilestoRepo = async (access_token: string,repo_name, username, content) => {
    const options = {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/vnd.github+json'
        },
    };


    const body = {
        "message": "Initial Commit",
        "commiter": {
            "name": "Test-app",
            "email": "test@gmail.com"
        },
        "content": content
    }

    const response = await axios.put(
        `https://api.github.com/repos/${username}/${repo_name}/contents/README.md`,
        body,
        options,
    );
    // console.log(response);
    return response.status >= 200 && response.status < 300;

};
