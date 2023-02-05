import { metronom, Types, LogLevels } from "../Cache";
import { VIDEO_STATUS } from '../Constants';

const redisRoomModel = metronom.define(
    {
        id: {
            type: Types.String,
            default: ''
        },
        video: {
            type: Types.Object,
            default: {
                link: {
                    type: Types.String,
                    default: ''
                },
                duration: {
                    type: Types.Number,
                    default: 0
                },
                status: {
                    type: Types.String,
                    default: VIDEO_STATUS.STOPPED,
                },
            }
        },
        messages: {
            type: Types.Array,
            default: []
        },
    },
    'rooms',
    {
        keyUnique: 'id',
        log: LogLevels.All,
    }
);

export default redisRoomModel;
