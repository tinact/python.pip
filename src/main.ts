import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const packages: string = core.getInput('packages')
    let packagesList: string[] | undefined

    if (packages) {
      packagesList = packages.split(/\s+/)
    } else {
      packagesList = undefined
    }

    if (!packages) {
      throw new Error('You must specify either packages')
    }

    const args = getArgs(packagesList)

    runPip(args)
  } catch (error) {
    core.setFailed(error.message)
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
