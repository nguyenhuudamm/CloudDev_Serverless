import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { deleteGroup } from '../api/groups-api'

export function Group(props) {
  const { group } = props
  const { getAccessTokenSilently } = useAuth0()

  const handleListImage = () => {
    // Xử lý khi nút "List Image" được nhấn
    // Ví dụ: chuyển hướng đến trang hiển thị danh sách ảnh của nhóm với ID tương ứng
  };

  const handleDelete = async (idGroup) => {
    const confirmed = window.confirm('Are you sure you want to delete this group? '+idGroup);
    if (confirmed) {
      const accessToken = await getAccessTokenSilently({
        audience: 'https://dev-dunkgqocqb1qxo0q.us.auth0.com/api/v2/',
        scope: 'write:groups'
      })
      const group = await deleteGroup(accessToken, idGroup)
      console.log('Group deleted:', idGroup);
      alert('Group deleted:', idGroup);
    }
  };

  return (
    <Card>
    <Card.Content>
      <Card.Header>
        <Link to={`/images/${group.id}`}>{group.name}</Link>
      </Card.Header>
      <Card.Description>{group.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      {/* Nút "List Image" */}
      <Button basic color="blue" onClick={handleListImage}>
        <Link to={`/images/${group.id}`}>List Image</Link>
      </Button>
      {/* Nút "Delete" */}
      <Button basic color="red" onClick={() =>handleDelete(group.id)}>
        Delete
      </Button>
    </Card.Content>
  </Card>
  )
}
