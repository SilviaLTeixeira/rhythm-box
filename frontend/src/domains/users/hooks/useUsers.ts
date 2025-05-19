import { useEffect, useState, useCallback } from 'react';
import { getUsers } from '../services/userService';
import { type User } from '../types/User';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { users, loading, error, refresh: fetch };
}
