<?php
$configFile = file("./less/config.less") or die("Can't read les config file");
$modifiedFileText = array_map('replaceLessProperty', $configFile);
file_put_contents('./less/config-custom.less', implode('', $modifiedFileText)) or die("can't write custom config");
function replaceLessProperty($configFileLine)
{
    $newProperties = $_POST['data'];
    $lessVariable = extractLessVariableName($configFileLine);
    $newPropertyValue = $newProperties[$lessVariable];
    if (array_key_exists($lessVariable, $newProperties) &&  $newPropertyValue) {
        return '@'.$lessVariable.": ".$newPropertyValue.";\n";
    } else {
        return $configFileLine;
    }
}
function extractLessVariableName($line)
{
    $variable =  trim(explode(':', $line)[0]);
    return trim($variable, '@');
}
