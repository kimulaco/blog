#!/usr/bin/env zx
import { $ } from 'zx'

const VERSION_PARTS_LENGTH = 3

await $`git fetch`
const currentPackage = JSON.parse(await $`cat package.json`)
const currentVersion = currentPackage.version

await $`git checkout main`
const mainPackage = JSON.parse(await $`cat package.json`)
const mainVersion = mainPackage.version

try {
  const isUpdatedVersion = validateIsUpdatedVersion(currentVersion, mainVersion)

  if (!isUpdatedVersion) {
    throw new Error(`Error: must update package version.
main: ${mainVersion}
develop: ${currentVersion}`)
  }

  console.log(`OK! package version is updated to ${currentVersion}`)
} catch (error) {
  console.error(error)
  process.exit(1)
}

function validateIsUpdatedVersion(newVersion, currentVersion) {
  validateVersion(newVersion)
  validateVersion(currentVersion)

  const [newMajorVersion, newMinorVersion, newPatchVersion] =
    newVersion.split('.')
  const [currentMajorVersion, currentMinorVersion, currentPatchVersion] =
    currentVersion.split('.')

  if (newMajorVersion > currentMajorVersion) {
    return true
  }
  if (newMajorVersion < currentMajorVersion) {
    return false
  }

  if (newMinorVersion > currentMinorVersion) {
    return true
  }
  if (newMinorVersion < currentMinorVersion) {
    return false
  }

  if (newPatchVersion > currentPatchVersion) {
    return true
  }
  if (newPatchVersion < currentPatchVersion) {
    return false
  }

  return false
}

function validateVersion(version) {
  const versionParts = version.split('.')

  if (versionParts.length !== VERSION_PARTS_LENGTH) {
    throw new Error(`Invalid version format. ${version}`)
  }

  for (const part of versionParts) {
    if (isNaN(Number(part))) {
      throw new Error(`Invalid version format. ${version}`)
    }
  }

  return true
}
