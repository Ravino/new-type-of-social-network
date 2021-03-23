# Environment
Runtime `environment` configurations and scripts for plizi.fun project.

## Repository structure
| Directory | Description | Details                              | 
|:---------:|:------------|:-------------------------------------|
|`environment/.stash` | Currently unused files | Stored for example or for future use |
|`environment/artifacts` | Local build directory | Required for local CodeBuild agent proper operation |
|`environment/scripts` | Runtime management scripts | List of scripts providing runtime manipulations |
|`environment/templates` | CloudFormation template files | List of backend environment template files |

## Management scripts
Each script from this section is located at `environment/scripts/` directory.

### Roles
```bash
$ bash role.sh <command>
```
| Command   | Description | Output                              | 
|:---------:|:------------|:-------------------------------------|
| create-master | Create role for stack management |  |
| delete-master | Delete role for stack management |  |
| replace-master | Replace role for stack management |  |
| create-zombie | Create temp role for resources removal | Create role if you have issue with not existing role on resources removal |
| delete-zombie | Delete temp role for resources removal | Create role if you have issue with not existing role on resources removal |
| replace-zombie | Replace temp role for resources removal | Create role if you have issue with not existing role on resources removal |

### Stack
```bash
$ bash stack.sh <command>
```
| Command   | Description | Output                              | 
|:---------:|:------------|:-------------------------------------|
| create | Create root application stack with presetted options |  |
| delete | Delete all application stacks and resources excepts root one |  |
| update | Update root application stach with presetted options and actual codebase/template |  |
| validate | Validate all templates that are listed in dir `environment/templates` |  |
| validate-one | Validate one template from listed in dir `environment/templates` |  |

bash /role.sh create-zombie