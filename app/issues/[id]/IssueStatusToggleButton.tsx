'use client';

import { Spinner } from '@/app/components';
import { Status } from '@prisma/client';
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const IssueStatusToggleButton = ({
  issueId,
  status,
}: {
  issueId: number;
  status: Status;
}) => {
  const [error, setError] = useState(false);
  const [isUpdatng, setUpdatng] = useState(false);

  const router = useRouter();

  const isClosed = status === 'CLOSED';

  const label = isClosed ? 'open' : 'close';
  const color = isClosed ? 'green' : 'orange';

  const toggleIssueStatus = async () => {
    const newStatus = isClosed ? 'OPEN' : 'CLOSED';

    try {
      setUpdatng(true);

      await axios.patch('/api/issues/' + issueId, { status: newStatus });

      router.push('/issues/list');
    } catch (error) {
      setUpdatng(false);

      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color={color} disabled={isUpdatng}>
            {isClosed ? <LockOpen2Icon /> : <LockClosedIcon />}

            <Text className="capitalize">{label} issue</Text>

            {isUpdatng && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>
            <Text className="capitalize"> Confirm {label}</Text>
          </AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to {label} this issue?
          </AlertDialog.Description>
          <Flex mt="4" gap="4">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color={color} onClick={toggleIssueStatus}>
                <Text className="capitalize"> Confirm {label}</Text>
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title color="red">Error</AlertDialog.Title>

          <AlertDialog.Description mb="3">
            The issue could not be {isClosed ? 'opened' : 'closed'}.
          </AlertDialog.Description>
          <Button color="gray" variant="soft" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueStatusToggleButton;
