import React from "react";
import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";

export const MainLink = ({ icon, color, label, togglePage }) => {
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