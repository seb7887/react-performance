export const logProfiler = (
  id: string,
  phase: string,
  actualTime: number,
  baseTime: number,
  startTime: number,
  commitTime: number
) => {
  console.log(`<${id}> render time: ${actualTime.toFixed(1)}ms`);
};
