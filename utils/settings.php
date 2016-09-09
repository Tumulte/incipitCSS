<?php
function fileListToHTMLOption($handle)
{
    $list = '<option value=none">Select</option>';
    while (false !== ($entry = readdir($handle))) {
        if ($entry == '.' or $entry == '..') {
            continue;
        } else {
            $list .= '"<option value="'.$entry.'">'.$entry.'</option>';
        }
    }
    return $list;
}
$fontLocation = "../fonts/";
$fontFolder = opendir($fontLocation) or die("Can't find or read font folder");
$fontList = fileListToHTMLOption($fontFolder);
$elementsFolder = scandir('../less/elements') or die("Can't find or read elements folder");
$elementsInput = '';
foreach ($elementsFolder as $element) {
    if ($element == '.' or $element == '..') {
        continue;
    }
    $elementsInput = '<label>'.$element.'<select data-prefix="\'elements/'.$element.'/" data-suffix="\'" class="less-var-change" id="elements-'.$element.'" name="elements-'.$element.'">';

    $elements = opendir('../less/elements/'.$element) or die("Can't find or read element folder");
    $elementsInput .= fileListToHTMLOption($elements);
    $elementsInput .= "</select></label>";
    echo $elementsInput;
}

?>

<form id="settings-form" class="container" method="post" action="/update_config.php" >
  <label>Font size (px)
  <input class="less-var-change" id="font-main-size" name="font-main-size" data-suffix="px" type="number" step="1"/>
  </label>
  <label>Base unit (line height, margins....)(rem)
  <input id="base-unit" class="less-var-change" name="base-unit"  data-suffix="rem" type="number" step="0.1"/>
  </label>
  <label>Main font
  <select id="font-main-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="font-main-url">
    <?php echo $fontList; ?>
  </select>
  </label>
  <label>Alternative font
  <select id="font-alt-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="font-main-url">
    <?php echo $fontList; ?>
  </select></label>
  <label>Third font
  <select id="font-third-url" data-prefix="'<?php echo $fontLocation; ?>" data-suffix="'" class="less-var-change" name="font-main-url">
    <?php echo $fontList; ?>
  </select>
  </label>
  <p>
  <label>Main color
  <input id="dominant" type="color" class="less-var-change" name="dominant" />
  </label>
  <label>Color scheme type
  <select id="color-type" data-prefix="'" data-suffix="'" class="less-var-change" name="color-type">
    <option value="op">Oposite colors</option>
    <option value="ana">Analogous colors</option>
    <option value="light">Light variations</option>
    <option value="sat">Saturation variations</option>
  </select>
  </label>
  </p>
    <button id="customize-colors" type="button">Customize</button>
    <div class="color-sample dominant">
        <span class="color-title">dominant</span>
    </div>
  <div class="color-sample subdom">
    <span class="color-title">subdom</span>
  </div>
  <div class="color-sample subdom2">
    <span class="color-title">subdom2</span>
  </div>
  <div class="color-sample bg">
    <span class="color-title">bg</span>
  </div>
  <div class="color-sample tonic">
    <span class="color-title">tonic</span>
  </div>
  <div class="color-sample tonic2">
    <span class="color-title">tonic2</span>
    </div>
  </div>
  <div class="color-sample tonic3">
    <span class="color-title">tonic3</span>
    </div>
  </div>
  <br/>
    <button type="button" id="save-settings">Save</button>
    <button type="button" id="close-settings">Close</button>
</form>
