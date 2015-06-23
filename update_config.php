<?php
var_dump($_POST);
$fileText = file("./less/config.less") or die("Can't read les config file");
$modifiedFileText = array_map('replaceLessProperty', $fileText);
function replaceLessProperty($fileTextLine)
{
    //checker scope
    $changedProperty = array(
                                "@sans-fail" => 'bouh',
                                "@serif-fail" => 'bla',
                            );
    $lineVariable = extractLessVariableOfLine($fileTextLine);
    if (array_key_exists($lineVariable, $changedProperty)) {
        echo $lineVariable;
        return $lineVariable.": ".$changedProperty[$lineVariable].";\n";
    } else {
        return $fileTextLine;
    }
}
function extractLessVariableOfLine($line)
{
    return trim(explode(':', $line)[0]);
}
file_put_contents('./less/config-custom.less', implode('', $modifiedFileText));
