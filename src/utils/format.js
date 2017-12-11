

export function formatTime(timestamp){
  let date = new Date(timestamp);
  return date.toLocaleDateString("zh-cn")
}
