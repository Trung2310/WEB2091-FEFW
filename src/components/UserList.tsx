import { useQuery } from '@tanstack/react-query';
import { List, Spin } from 'antd';

type User = {
    id: number,
    name: string
}

async function fetchUser() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return response.json();
}

const UserList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
    });

    if (isLoading) return <Spin />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <List
                bordered
                dataSource={data}
                renderItem={(user: User) => (
                    <List.Item>
                        {user.name}
                    </List.Item>
                )}
            />
        </>
    )
}

export default UserList;

