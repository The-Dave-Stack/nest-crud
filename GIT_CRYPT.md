# git-crypt Setup

This repository uses [git-crypt](https://github.com/AGWA/git-crypt) to transparently encrypt sensitive files such as environment variables, SSL certificates, and API keys.

## Encrypted Files

The following file patterns are encrypted (defined in `.gitattributes`):

- `.env*` - Environment variable files
- `*.key`, `*.pem`, `*.p12`, `*.pfx` - SSL certificates and private keys
- `secrets/**` - Secrets directory

## First-Time Setup

### After Cloning the Repository

When you first clone this repository, sensitive files will appear encrypted (garbled content). To decrypt them:

```bash
# If you have GPG configured with an authorized key
git-crypt unlock

# Or with a symmetric key file (if provided)
git-crypt unlock /path/to/git-crypt-key
```

### Adding a New Team Member

To grant someone access to encrypted files, add their GPG key:

```bash
# Add a collaborator by email (their GPG key must be in your keyring)
git-crypt add-gpg-user user@example.com

# Commit the changes
git add .git-crypt/keys/default/0/*.gpg
git commit -m "Add git-crypt collaborator"
git push
```

### Exporting a Symmetric Key (Backup)

To create a backup key that doesn't require GPG:

```bash
git-crypt export-key git-crypt-key
```

Store this key securely. It can decrypt the repository but should never be committed to git.

## Verifying Encryption Status

To check which files are encrypted:

```bash
git-crypt status
```

To show encrypted/decrypted status of all files:

```bash
git-crypt status -e
```

## GPG Key Requirements

Users must have a valid GPG key that's not expired. To check your key:

```bash
gpg --list-keys your-email@example.com
```

If your key is expired, renew it:

```bash
gpg --edit-key your-email@example.com
# In GPG prompt: key 0 -> expire -> 1y -> key 1 -> expire -> 1y -> save
```

## Security Notes

- Never commit the `git-crypt-key` file to the repository
- The `.gitattributes` file must NOT be encrypted
- Git-crypt does NOT encrypt filenames, only file contents
- Revoking access requires key rotation (not supported by git-crypt)

## Troubleshooting

### Files appear garbled after cloning

Run `git-crypt unlock` to decrypt the repository.

### GPG key expired

Renew your GPG key as shown above, then re-add yourself to git-crypt.

### Cannot unlock the repository

Ensure your GPG key is in the authorized list in `.git-crypt/keys/default/0/`
