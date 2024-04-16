module.exports = {
  matcher: (rawCommitInfo) => {
    const { message, description: rawDescription } = rawCommitInfo;

    // 先过滤 PR 类型 commit
    const messageMatchRes =
      message.match(/Merge pull request #\d+ from ([^\\]+)\/(.+)/) || [];

    if (!messageMatchRes) return false;

    const [, author] = messageMatchRes;

    // 再提取 commit 信息
    const [, type, scope, description] =
      rawDescription.match(/(feat|fix)(?:\(([^)]*?)\))?:\s?(.+)/) || [];

    if (!type || !description) return false;

    return {
      type,
      scope,
      description,
      author,
    };
  },
};
