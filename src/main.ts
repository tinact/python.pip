import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const packages: string = core.getInput('packages')
    const packagesList: string[] | undefined = getPackages(packages)
    const args = getArgs(packagesList)

    if (!packages) {
      throw new Error('You must specify either packages')
    }

    runPip(args)
      .then(() =>
        core.info(`Package ${packagesList} were successfully installed.`)
      )
      .catch(err => core.setFailed(err.message))
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getPackages(packages: string): string[] | undefined {
  if (packages) {
    return packages.split(/\s+/)
  } else {
    return undefined
  }
}

function getArgs(packagesList: string[] | undefined): string[] {
  let args: string[] = ['-m', 'pip', 'install']

  if (packagesList) {
    args = args.concat(packagesList)
  }

  return args
}

function getPython(): string {
  const envLocation: string | undefined = process.env.pythonLocation

  if (envLocation) {
    return path.join(envLocation, 'python')
  } else {
    throw new Error('Python could not be found')
  }
}

const runPip = async (args: string[]): Promise<void> => {
  await exec.exec(getPython(), args)
}

run()
