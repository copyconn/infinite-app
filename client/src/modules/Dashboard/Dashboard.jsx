import React, { useContext, useState } from "react";
import { AppShell, Group, Header, Navbar, Text } from "@mantine/core";

import { Navigation } from "./Navigation";
import { Tables } from "./Tables";

import { dataContext } from "../../App";

export const Dashboard = () => {
    const data = useContext(dataContext)

    return (
        <AppShell
            padding="md"
            fixed={false}
            navbar={
                <Navbar width={{ base: 300 }} height={500} p="xs">
                    <Navbar.Section grow mt="xs">
                        <Navigation/>
                    </Navbar.Section>
                    {/*<Navbar.Section>*/}
                    {/*    /!*<User/>*!/*/}
                    {/*</Navbar.Section>*/}
                </Navbar>
            }
            header={
                <Header height={60}>
                    <Group sx={{ height: '100%' }} px={20} position="apart">
                        <Text size="xl" style={{ fontWeight: 700 }}>Dashboard</Text>
                    </Group>
                </Header>
            }
        >
            {data.page && <Tables/>}

        </AppShell>
    )
}