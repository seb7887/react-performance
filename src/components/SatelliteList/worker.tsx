const ctx: Worker = self as any;

ctx.onmessage = e => {
  const satellites = e.data;
  satellites.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  ctx.postMessage(satellites);
};
