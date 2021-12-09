import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

// const appId = "902b2e809ca54994ba1af501720d3c0f";
// const token =
//   "006902b2e809ca54994ba1af501720d3c0fIACMQnjd3Mmto7F08fdn+kIOkO1sh1WR8GxyXXqdOV7yzWTNKL8AAAAAEAA8g5F5sImxYAEAAQCwibFg";

const appId = "3c6e2d692e6841fa9ec3ff4d4455897e";
console.log(localStorage.getItem('Rtctoken'), "tttttdddddooooookkkkkkwwwwwwww");
const token = localStorage.getItem('Rtctoken');
// "0063c6e2d692e6841fa9ec3ff4d4455897eIACk0nhXxcDnTb/XoRwDMzrSo1Dy4PbYImfoo9nmRJHtrHL2ZcgAAAAAIgAQcBReXx2qYQQAAQDv2ahhAgDv2ahhAwDv2ahhBADv2ahh";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: localStorage.getItem('Rtctoken')};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = localStorage.getItem('Rtcchannel');
