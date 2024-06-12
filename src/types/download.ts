import { DOWNLOAD } from "@/constants/download";

export type TDownload = (typeof DOWNLOAD)[keyof typeof DOWNLOAD];
