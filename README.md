# Action: Python Pip

This action install pip package.

## Inputs

### packages

A string of Python package to be installed.

## Example Usage

```yaml
- name: Python pip
  uses: tinact/python.pip@master
  with:
    packages: |
      yamllint
      ansible-lint
```

## License

This project is under the MIT License. See the [LICENSE](licence) file for the full license text.

## Copyright

(c) 2020, Tinact
