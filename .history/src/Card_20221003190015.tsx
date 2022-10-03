export function Card({ text }: { text?: string }) {
    return (
        <Container>
            <CheckIcon />

            {text?.split(/(https?:\/\/\S+)/g).map((fragment, i) =>
                i % 2 === 0 ? (
                    <Text key={i}>{fragment}</Text>
                ) : (
                    <Link key={i} href={fragment}>
                        {fragment}
                    </Link>
                ),
            )}

            <DeleteButton />
        </Container>
    )
}