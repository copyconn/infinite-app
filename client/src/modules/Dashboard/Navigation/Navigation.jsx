import React, { useContext } from "react";
import {
    IconGitPullRequest,
    IconAlertCircle,
    IconMessages,
    IconDatabase,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

import { dataContext } from "../../../App";

const data = [
    { icon: <IconDatabase size="1rem"/>, color: 'grape', label: 'Tables' },
    // { icon: <IconGitPullRequest size="1rem"/>, color: 'blue', label: 'Pull Requests' },
    { icon: <IconAlertCircle size="1rem"/>, color: 'teal', label: 'Information' },
    { icon: <IconMessages size="1rem"/>, color: 'violet', label: 'Comments' },
]

const MainLink = ({ icon, color, label, togglePage }) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.black,

                '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                },
            })}
            onClick={() => togglePage(label)}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    )
}

export const Navigation = () => {
    const context = useContext(dataContext)

    const links = data.map((link) => <MainLink
        {...link}
        togglePage={context.togglePage}
        key={link.label}
    />);

    return <div>{links}</div>;
}