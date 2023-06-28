import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Header,
  HoverCard,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";

export default function Navigation() {
  return (
    <Box pb={120}>
      <Header
        height={60}
        px="md">
        <Group
          sx={{ height: "100%" }}
          spacing={0}>
          <a href="#">Home</a>
          <HoverCard
            width={600}
            position="bottom"
            radius="md"
            shadow="md"
            withinPortal>
            <HoverCard.Target>
              <a href="#">
                <Center inline>
                  <Box
                    component="span"
                    mr={5}>
                    Features
                  </Box>
                </Center>
              </a>
            </HoverCard.Target>
            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
              <Group
                position="apart"
                px="md">
                <Text fw={500}>Features</Text>
                <Anchor
                  href="#"
                  fz="xs">
                  View all
                </Anchor>
              </Group>

              <Divider
                my="sm"
                mx="-md"
              />

              <SimpleGrid
                cols={2}
                spacing={0}>
                <UnstyledButton>
                  <Group
                    noWrap
                    align="flex-start">
                    <div>
                      <Text
                        size="sm"
                        fw={500}>
                        1
                      </Text>
                      <Text
                        size="xs"
                        color="dimmed">
                        Beschreibung
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
                <UnstyledButton>
                  <Group
                    noWrap
                    align="flex-start">
                    <div>
                      <Text
                        size="sm"
                        fw={500}>
                        2
                      </Text>
                      <Text
                        size="xs"
                        color="dimmed">
                        Beschreibung
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
                <UnstyledButton>
                  <Group
                    noWrap
                    align="flex-start">
                    <div>
                      <Text
                        size="sm"
                        fw={500}>
                        3
                      </Text>
                      <Text
                        size="xs"
                        color="dimmed">
                        Beschreibung
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </SimpleGrid>

              <div>
                <Group position="apart">
                  <div>
                    <Text
                      fw={500}
                      fz="sm">
                      Get started
                    </Text>
                    <Text
                      size="xs"
                      color="dimmed">
                      Their food sources have decreased, and their numbers
                    </Text>
                  </div>
                  <Button variant="default">Get started</Button>
                </Group>
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Header>
    </Box>
  );
}
