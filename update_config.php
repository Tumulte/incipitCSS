<?php
$newProperties =  array_filter($_POST, 'removeEmpty');
//needed for the strpos of the filter
array_walk($newProperties, function(&$value, $key) { $value =  strpos($key, 'custom')?"$value; //custom":$value; });
$configFile = file("./less/config.less") or die("Can't read les config file");
$replaceLessProperty = function($configFileLine) use ($newProperties)
{
    $lessVariable = extractLessVariableName($configFileLine);
    $newPropertyValue = $newProperties[$lessVariable];
    if (array_key_exists($lessVariable, $newProperties) &&  $newPropertyValue) {
        var_dump($newProperties);
        return '@'.$lessVariable.": ".$newPropertyValue.";\n";
    } else {
        return $configFileLine;
    }
};
$modifiedFileText = array_map($replaceLessProperty, $configFile);
$customProperties =  array_filter($newProperties, 'keepCustomOnly');
array_walk($customProperties, function(&$value, $key) { $value = "$key:  $value;\n"; });
$completeNewProperties = array_merge($modifiedFileText,$customProperties);
file_put_contents('./less/config.less', implode('', $completeNewProperties)) or die("can't write custom config");
function extractLessVariableName($line)
{
    $variable =  trim(explode(':', $line)[0]);
    return trim($variable, '@');
}
function removeEmpty($property)
{
    return $property != '';
}
function keepCustomOnly($property)
{
    return strpos($property, 'custom');
}
function keyValueToLessLine($property)
{
    $key = key($property);
    return $key.': '.$property[$key].";\n";
}
