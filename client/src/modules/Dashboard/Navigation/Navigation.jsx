import React, { useContext } from "react";
import {
    IconAlertCircle,
    IconMessages,
    IconDatabase,
} from '@tabler/icons-react';

import { MainLink } from "./MainLink";

import { dataContext } from "../../../App";

const data = [
    { icon: <IconDatabase size="1rem"/>, color: 'grape', label: 'Tables' },
    { icon: <IconAlertCircle size="1rem"/>, color: 'teal', label: 'Information' },
    { icon: <IconMessages size="1rem"/>, color: 'violet', label: 'Comments' },
]

export const Navigation = () => {
    const context = useContext(dataContext)

    const links = data.map((link) => <MainLink
        {...link}
        togglePage={context.togglePage}
        key={link.label}
    />);

    return <div>{links}</div>;
}