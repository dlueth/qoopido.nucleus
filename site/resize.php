<?php
class Image {
	protected $image;
	protected $width;
	protected $height;
	protected $temporary = NULL;
	protected $imageconvolution = NULL;
	protected $imagefilter = NULL;
	protected $imagelayereffect = NULL;
	protected $curl = NULL;
	protected $urlfopen = NULL;
	protected $exif = NULL;
	
	public function __construct($image = NULL) {
		$this->imageconvolution = function_exists('imageconvolution');
		$this->imagefilter      = function_exists('imagefilter');
		$this->imagelayereffect = function_exists('imagelayereffect');
		$this->curl             = extension_loaded('curl');
		$this->urlfopen         = (bool) ini_get('allow_url_fopen');
		$this->exif             = extension_loaded('exif');
		$this->temporary        = array('images' => array(), 'colors' => array());

		if(!empty($image) && is_file($image) && is_readable($image)) {
			$size = getimagesize($image);

			if($size != false) {
				switch($size[2]) {
					case 1: // GIF
						$image = imagecreatefromgif($image);
						break;
					case 2: // JPEG
						if($this->exif === true) {
							$exif  = exif_read_data($image);
							$image = imagecreatefromjpeg($image);

							unset($exif);
						} else {
							$image = imagecreatefromjpeg($image);
						}

						break;
					case 3: // PNG
						$image = imagecreatefrompng($image);
						break;
				}

				$this->_set($image, $size[0], $size[1]);
			}

			unset($size);
		}

		unset($image);
	}

	private function _set(&$image, $width = NULL, $height = NULL) {
		$width  = ($width === NULL) ? $this->width : $width;
		$height = ($height === NULL) ? $this->height : $height;

		if($this->image !== NULL) {
			imagedestroy($this->image);
		}

		$this->image = imagecreatetruecolor($width, $height);

		imagealphablending($this->image, false);
		imagesavealpha($this->image, true);
		imagecopy($this->image, $image, 0, 0, 0, 0, $width, $height);

		$this->width  = $width;
		$this->height = $height;

		$this->_clean();
	}

	private function _clean() {
		if($this->temporary !== NULL) {
			foreach($this->temporary['colors'] as $k => $v) {
				unset($this->temporary['colors'][$k]);
			}

			foreach($this->temporary['images'] as $k => $v) {
				imagedestroy($v);
				unset($this->temporary['images'][$k]);
			}
		}
	}

	public function resize($size, $mode = 3) {
		$size = (is_scalar($size)) ? array_fill(0, 2, $size) : $size;

		switch($mode) {
			case 1:
				$size[1] = (int) round($this->height * ($size[0] / $this->width));
				break;
			case 2:
				$size[0] = (int) round($this->width * ($size[1] / $this->height));
				break;
			case 3:
				$ratio = array($size[0] / $this->width, $size[1] / $this->height);

				if($ratio[0] > $ratio[1]) {
					// portrait
					$size[1] = (int) round($this->height * $ratio[0]);
				} else {
					// landscape
					$size[0] = (int) round($this->width * $ratio[1]);
				}

				unset($ratio);

				break;
			case 4:
				$ratio = array($size[0] / $this->width, $size[1] / $this->height);

				if($ratio[0] > $ratio[1]) {
					// portrait
					$size[0] = (int) round($this->width * $ratio[1]);
				} else {
					// landscape
					$size[1] = (int) round($this->height * $ratio[0]);
				}

				unset($ratio);

				break;
			case 5:
				$size[0] = (int) round($this->width * $size[0]);
				$size[1] = (int) round($this->height * $size[1]);

				break;
		}

		// process
		if($size[0] != $this->width || $size[1] != $this->height) {
			$this->temporary['images']['final'] = imagecreatetruecolor($size[0], $size[1]);

			imagealphablending($this->temporary['images']['final'], false);
			imagesavealpha($this->temporary['images']['final'], true);
			imagecopyresampled($this->temporary['images']['final'], $this->image, 0, 0, 0, 0, $size[0], $size[1], $this->width, $this->height);

			$this->_set($this->temporary['images']['final'], $size[0], $size[1]);
		}

		unset($size, $mode, $result);

		return $this;
	}

	public function crop($width, $height, $x = false, $y = false) {
		if($x === false) {
			$x = floor($this->width / 2 - $width / 2);
		}

		if($y === false) {
			$y = floor($this->height / 2 - $height / 2);
		}

		$this->temporary['images']['final'] = imagecreatetruecolor($width, $height);

		imagealphablending($this->temporary['images']['final'], false);
		imagesavealpha($this->temporary['images']['final'], true);
		imagecopy($this->temporary['images']['final'], $this->image, 0, 0, $x, $y, $width, $height);

		$this->_set($this->temporary['images']['final'], $width, $height);

		unset($width, $height, $x, $y, $result);

		return $this;
	}

	public function sharpen($amount = 50) {
		$amount = 100 - ($amount / (100 / 80));

		$this->temporary['images']['final'] = imagecreatetruecolor($this->width, $this->height);

		imagealphablending($this->temporary['images']['final'], false);
		imagesavealpha($this->temporary['images']['final'], true);
		imagecopy($this->temporary['images']['final'], $this->image, 0, 0, 0, 0, $this->width, $this->height);

		$matrix = array(
			array(-1, -2, -1),
			array(-2, $amount, -2),
			array(-1, -2, -1)
		);

		imageconvolution($this->temporary['images']['final'], $matrix, $amount - 12, 0);

		$this->_set($this->temporary['images']['final']);

		unset($amount, $result, $matrix);

		return $this;
	}

	public function get($type = 'png', $interlace = false, $quality = NULL, $filter = PNG_ALL_FILTERS) {
		$type = strtolower($type);

		if($interlace === true) {
			imageinterlace($this->image, 1);
		}

		ob_start();

		switch($type) {
			case 'png':
				$quality = ($quality === NULL) ? 9 : max(0, min(9, (int) $quality));

				imagepng($this->image, NULL, $quality, $filter);
				break;
			case 'jpeg':
				$quality = ($quality === NULL) ? 100 : max(0, min(100, (int) $quality));

				imagejpeg($this->image, NULL, $quality);
				break;
			case 'gif':
				$quality = ($quality === NULL) ? 255 : max(0, min(255, (int) $quality));
				$temp    = imagecreatetruecolor($this->width, $this->height);

				imagecopy($temp, $this->image, 0, 0, 0, 0, $this->width, $this->height);
				imagetruecolortopalette($temp, false, $quality);
				imagecolormatch($this->image, $temp);
				imagegif($temp);

				unset($temp);

				break;
		}

		unset($type, $interlace, $quality, $filter, $result);

		return trim(ob_get_clean());
	}
}

try {
	$path   = (!empty($_GET['resize']['file'])) ? (string) $_GET['resize']['file'] : NULL;
	$width  = (!empty($_GET['resize']['width']) && is_numeric($_GET['resize']['width'])) ? (int) $_GET['resize']['width'] : NULL;
	$height = (!empty($_GET['resize']['height']) && is_numeric($_GET['resize']['height'])) ? (int) $_GET['resize']['height'] : NULL;
	$dpr    = (!empty($_GET['resize']['dpr']) && is_numeric($_GET['resize']['dpr'])) ? (float) $_GET['resize']['dpr'] : NULL;
	$source = (!empty($path)) ? dirname(dirname(__FILE__)) . $path : NULL;

	if(!empty($source) && is_file($source) && !empty($width) && !empty($height) && !empty($dpr)) {
		$type   = strtolower(preg_replace('/^.+\.(jp(e?)g|png|gif|webp)$/i', '\1', $path));
		$type   = ($type === 'jpg') ? 'jpeg' : $type;
		$target = preg_replace('/^(.+)\.(jp(e?)g|png|gif|webp)$/i', '\1.' . $width . 'x' . $height . '@' . $dpr . '.\2', $source);
		$dpr    = min(2, $dpr / 100);

		if(!is_file($target)) {
			$image = new Image($source);

			$image
				->resize(array($width * $dpr, $height * $dpr))
				->crop($width * $dpr, $height * $dpr);
				//->sharpen();

			switch($type) {
				case 'jpeg':
					$data = $image->get('jpeg', true, 75);
					break;
				case 'png':
					$data = $image->get('png', true, 5);
					break;
				case 'gif':
					$data = $image->get('png', true, 192);
					break;
			}

			if(!is_dir(dirname($target))) {
				mkdir(dirname($target), 0777, true);
			}

			file_put_contents($target, $data, LOCK_EX);
		}

		header('Content-Type: image/' . $type);
		header('Content-Length: ' . filesize($target));
		header('Last-Modified: ' . gmdate('r', filemtime($target)) . ' GMT');
		if(isset($data) && !empty($data)) {
			die($data);
		} else {
			readfile($target);
			die();
		}
	}
} catch(\Exception $exception) {}

header('HTTP/1.1 404 Not Found');
die();
?>