import { atom } from "recoil";

export const likeSongIdState = atom({
    key: "likeSongIdState",  
    default: [],
});

export const isLikeSongState = atom({
    key: "isLikeSongState",  
    default: false,
});